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

  get documentationPath(): string {
    return `${this.baseContextPath}/internal-ms/doc`;
  }

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  private banner(): string {
    return this.configService.get<string>('app.banner');
  }

  get buildBanner(): string {
    return `
    ${this.banner()}
    Port: ${this.port}
    Context Path:  http://localhost:${this.port}/${this.baseContextPath}
    Documentation: http://localhost:${this.port}/${this.documentationPath}
    `;
  }
}
