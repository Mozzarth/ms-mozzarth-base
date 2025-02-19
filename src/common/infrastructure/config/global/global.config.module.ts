import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './global.config';
import * as Joi from 'joi';
import { GlobalConfigService } from './global.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        TIME_ZONE: Joi.string().required(),
        INTERNAL_MICROSERVICES_URL: Joi.string().required()
      })
    })
  ],
  providers: [GlobalConfigService],
  exports: [GlobalConfigService]
})
export class GlobalConfigModule {}
