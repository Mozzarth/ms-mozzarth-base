import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DatabaseType } from 'typeorm';
import mysqlConfig from './connection/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [mysqlConfig]
        })
      ],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql' as DatabaseType,
        host: configService.get('mysql.host'),
        port: configService.get('mysql.port'),
        username: configService.get('mysql.username'),
        password: configService.get('mysql.password'),
        database: configService.get('mysql.database'),
        synchronize: false,
        autoLoadEntities: true,
        logging: ['error', 'migration', 'schema']
      }),
      inject: [ConfigService]
    } as TypeOrmModuleAsyncOptions)
  ]
})
export class MysqlModule {}
