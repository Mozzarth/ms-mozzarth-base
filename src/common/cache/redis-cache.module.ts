import * as redisStore from 'cache-manager-redis-store';
import { Module } from '@nestjs/common';
import { RedisCacheService } from './infrastructure/connection/redis-cache.service';
import { TurboConfigModule } from '../infrastructure/config/turbo-config.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RedisConfig from './infrastructure/connection/redis-caching.config';

@Module({
  imports: [
    TurboConfigModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule.forRoot({ load: [RedisConfig] })],
      useFactory: async (config: ConfigService) => ({
        ttl: 0,
        store: redisStore,
        host: config.get<string>('redis.host'),
        port: config.get<number>('redis.port')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [{ provide: 'CacheService', useClass: RedisCacheService }],
  exports: ['CacheService']
})
export class RedisCacheModule {}
