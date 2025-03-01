import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get baseContextPath(): string {
    return this.configService.get<string>('app.baseContextPath');
  }

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get host(): string {
    return this.configService.get<string>('app.host');
  }

  get buildBanner(): string {
    return `
    ${this.configService.get<string>('app.banner')}
    Host: ${this.configService.get<string>('app.host')}
    Port: ${this.configService.get<string>('app.port')}
    Context Path: ${this.configService.get<string>('app.baseContextPath')}
    `;
  }
}
