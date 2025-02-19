import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GlobalConfigService {
  constructor(private configService: ConfigService) {}

  get country_code(): string {
    return this.configService.get<string>('global.country_code');
  }

  get timezone(): string {
    return this.configService.get<string>('global.timezone');
  }

  get internal_ms_url(): string {
    return this.configService.get<string>('global.internal_ms_url');
  }

  get microservices_url(): string {
    return this.configService.get<string>('global.microservices_url');
  }
}
