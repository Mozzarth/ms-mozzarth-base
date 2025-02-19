import { Module } from '@nestjs/common';
import { CommonInfrastructureModule } from './infrastructure/common.infrastructure.module';
import { BrokerModule } from './broker/broker.module';
import { MysqlModule } from './infrastructure/database/mysql/mysql.module';
import { RedisCacheModule } from './cache/redis-cache.module';

@Module({
  exports: [],
  providers: [],
  imports: [CommonInfrastructureModule, BrokerModule, MysqlModule, RedisCacheModule]
})
export class CommonModule {}
