import 'src/common/infrastructure/monitoring/tracing';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './common/infrastructure/config/app/app.config.service';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfigService } from './common/infrastructure/config/swagger/swagger.config.service';
import { BrokerConfigService } from './common/broker/infrastructure/config/broker.config.service';
import { CatchAllErrorsFilter } from './common/infrastructure/exception-filter/catch-all-errors.filter';
import { ValidationPipeGlobal } from './common/infrastructure/pipe/validation-pipe.global';
process.env.TZ = 'UTC';

async function bootstrap() {
  // Initial const(s)
  const logger = new Logger(bootstrap.name);

  // AppModule Configuration
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log']
  });

  app.useGlobalFilters(new CatchAllErrorsFilter());

  const appConfig: AppConfigService = app.get(AppConfigService);
  app.setGlobalPrefix(appConfig.baseContextPath);

  // Swagger Setup
  const swaggerConfig: SwaggerConfigService = app.get(SwaggerConfigService);
  SwaggerModule.setup(`${appConfig.baseContextPath + '/internal-ms' + swaggerConfig.path}`, app, swaggerConfig.buildDocument(app));

  /* Configuring the Kafka. */
  BrokerConfigService.initialize(app);

  app.useGlobalFilters(new CatchAllErrorsFilter());
  app.useGlobalPipes(new ValidationPipe(ValidationPipeGlobal));

  await app.startAllMicroservices();

  // Start the server
  await app.listen(appConfig.port, appConfig.host);
  logger.log(appConfig.buildBanner);
}

bootstrap();
