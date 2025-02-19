import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CachingConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('redis.host');
  }

  get port(): number {
    return this.configService.get<number>('redis.port');
  }

  get database(): number {
    return this.configService.get<number>('redis.database');
  }

  get ttl(): number {
    const ttl = this.configService.get<number>('redis.ttl');
    return ttl ? ttl * 60 : 0;
  }
}
