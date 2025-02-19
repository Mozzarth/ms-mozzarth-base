import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './caching.config';
import * as Joi from 'joi';
import { CachingConfigService } from './caching.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_DB: Joi.number().default(0),
        REDIS_TTL: Joi.number().default(0)
      })
    })
  ],
  providers: [CachingConfigService],
  exports: [CachingConfigService]
})
export class CachingConfigModule {}
