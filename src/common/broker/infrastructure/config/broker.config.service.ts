import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { BROKER } from './broker.enum';

@Injectable()
export class BrokerConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('kafka.host');
  }

  get port(): string {
    return this.configService.get<string>('kafka.port');
  }

  get producer_send_timeout(): number {
    return this.configService.get<number>('kafka.producer_send_timeout');
  }

  get service(): string {
    return BROKER.SERVICE;
  }

  get name(): string {
    return BROKER.NAME;
  }

  get client_id(): string {
    return BROKER.CLIENT_ID;
  }

  get consumer_group_id(): string {
    return BROKER.CONSUMER_GROUP_ID;
  }

  get heartbeat_interval(): number {
    return BROKER.HEARTBEAT_INTERVAL;
  }

  static async initialize(app: INestApplication): Promise<void> {
    const appConfig = app.get(BrokerConfigService);
    app.connectMicroservice({
      name: BROKER.NAME.toString(),
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: appConfig.client_id,
          brokers: [`${appConfig.host}:${appConfig.port}`]
        },
        consumer: {
          groupId: appConfig.consumer_group_id
        }
      }
    });
  }
}
