import { DatabaseConfigService } from './mysql.config.service';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './mysql.config';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DB_USER: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_HOST: Joi.string().required()
      })
    })
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService]
})
export class DatabaseConfigModule {}
