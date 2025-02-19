import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CacheService } from 'src/common/cache/domain/adapters/cache.service';
import { CacheParams } from 'src/common/cache/domain/enums/redis-params';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService implements CacheService {
  protected logger = new Logger(RedisCacheService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set<T>(key: string, value: T, params?: CacheParams): Promise<T | undefined> {
    await this.cacheManager.set(this.getKey(key, params), value);
    return this.get<T>(key, params);
  }

  getKey(key: string, params?: CacheParams): string {
    let newKey = key.toString();
    if (params && params.values.length > 0 && params.separator) {
      newKey = `${key}${params.separator}${params.values.join(params.separator)}`;
    }
    return newKey;
  }

  get<T>(key: string, params?: CacheParams): Promise<T | undefined> {
    return this.cacheManager.get(this.getKey(key, params));
  }
}
