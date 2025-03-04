import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './common/infrastructure/config/app/app.config.service';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfigService } from './common/infrastructure/config/swagger/swagger.config.service';
import { BrokerConfigService } from './common/broker/infrastructure/config/broker.config.service';
import { CatchAllErrorsFilter } from './common/infrastructure/exception-filter/catch-all-errors.filter';
import { ValidationPipeGlobal } from './common/infrastructure/pipe/validation-pipe.global';
import { OtelWinstonLogger } from './common/infrastructure/logger';
import { initializeOpenTelemetry } from './common/infrastructure/monitoring/tracing';

async function bootstrap() {
  initializeOpenTelemetry();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'log']
  });

  const logger = new Logger(bootstrap.name);
  app.useGlobalFilters(new CatchAllErrorsFilter());

  const appConfig: AppConfigService = app.get(AppConfigService);
  app.setGlobalPrefix(appConfig.baseContextPath);

  // Swagger Setup
  const swaggerConfig: SwaggerConfigService = app.get(SwaggerConfigService);
  SwaggerModule.setup(appConfig.documentationPath, app, swaggerConfig.buildDocument(app));

  /* Configuring the Kafka. */
  BrokerConfigService.initialize(app);

  app.useGlobalFilters(new CatchAllErrorsFilter());
  app.useGlobalPipes(new ValidationPipe(ValidationPipeGlobal));

  await app.startAllMicroservices();

  // Start the server
  await app.listen(appConfig.port);
  logger.log(appConfig.buildBanner);
  app.useLogger(new OtelWinstonLogger());
}

bootstrap();
