import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get type(): string {
    return this.configService.get<string>('mysql.type');
  }

  get synchronize(): boolean {
    return this.configService.get<boolean>('mysql.synchronize');
  }

  get host(): string {
    return this.configService.get<string>('mysql.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('mysql.port'));
  }

  get username(): string {
    return this.configService.get<string>('mysql.username');
  }

  get password(): string {
    return this.configService.get<string>('mysql.password');
  }

  get database(): string {
    return this.configService.get<string>('mysql.database');
  }

  get autoLoadEntities(): boolean {
    return this.configService.get<boolean>('mysql.autoLoadEntities');
  }
}
