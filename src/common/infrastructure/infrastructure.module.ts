import { Module } from '@nestjs/common';
import { BrokerModule } from '../broker/broker.module';
import { MysqlModule } from './database/mysql/mysql.module';
import { RedisCacheModule } from '../cache/redis-cache.module';
import { InfraConfigurationModule } from './config/infra-config.module';
import { HealthModule } from './controller/health/health.module';
import { HttpClientModule } from './http-client/http.module';

@Module({
  exports: [],
  providers: [],
  imports: [BrokerModule, MysqlModule, RedisCacheModule, InfraConfigurationModule, HealthModule, HttpClientModule]
})
export class InfraModule {}
