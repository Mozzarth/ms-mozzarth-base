import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './app.config';
import * as Joi from 'joi';
import { AppConfigService } from './app.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        BASE_CONTEXT_PATH: Joi.string(),
        APP_PORT: Joi.number().default(3000),
        APP_HOST: Joi.string().default('0.0.0.0')
      })
    })
  ],
  providers: [AppConfigService],
  exports: [AppConfigService] // Exporta AppConfigService
})
export class AppConfigModule {}
