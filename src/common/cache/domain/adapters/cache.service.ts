import { CacheParams } from '../enums/redis-params';

export interface CacheService {
  get<T>(key: string, params?: CacheParams): Promise<T | undefined>;

  set<T>(key: string, value: T, params?: CacheParams): Promise<T | undefined>;
}
