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
        APP_HOST: Joi.string(),
        APP_PORT: Joi.number(),
        BASE_CONTEXT_PATH: Joi.string()
      })
    })
  ],
  providers: [AppConfigService],
  exports: [AppConfigService] // Exporta AppConfigService
})
export class AppConfigModule {}
