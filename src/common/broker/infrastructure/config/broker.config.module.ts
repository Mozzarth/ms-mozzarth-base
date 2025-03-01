import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './broker.config';
import { BrokerConfigService } from './broker.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        BROKER_HOST: Joi.string().required(),
        BROKER_PORT: Joi.string().required()
      }),
      isGlobal: true
    })
  ],
  providers: [BrokerConfigService],
  exports: [BrokerConfigService]
})
export class BrokerConfigModule {}
