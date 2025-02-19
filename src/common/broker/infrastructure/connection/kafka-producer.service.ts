import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ProducerService } from 'src/common/broker/domain/adapters/producer.service';
import { ClientKafka } from '@nestjs/microservices';
import { DateHelper } from 'src/common/app/helper/date.helper';
import { StringHelper } from 'src/common/app/helper/string.helper';
import { Message, RecordMetadata } from '@nestjs/microservices/external/kafka.interface';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map, of, timeout } from 'rxjs';

@Injectable()
export class KafkaProducerService implements OnApplicationBootstrap, ProducerService {
  private readonly timeout: number;
  private readonly timeZone: string;
  private readonly countryCode: string;
  protected logger = new Logger(KafkaProducerService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject('KAFKA_SERVICE') private readonly clientKafka: ClientKafka
  ) {
    this.timeZone = this.configService.get<string>('global.time_zone');
    this.countryCode = this.configService.get<string>('global.country_code');
    this.timeout = Number(this.configService.get<number>('kafka.producer_send_timeout'));
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.clientKafka.connect();
    this.logger.log('Kafka Client Connected');
  }

  public async emit<T = any>(topic: string, message: T, partition?: number): Promise<boolean> {
    const payload = this.buildPayload([message, partition])[0];
    return firstValueFrom(
      this.clientKafka.emit(topic, payload).pipe(
        timeout(this.timeout),
        map((result: RecordMetadata[]) => {
          if (result[0].errorCode != 0) return false;
          this.logger.log(`-> Sending message [${topic}]: ${payload.value}`);
          return true;
        }),
        catchError((e) => {
          this.logger.error('Error in kafka emit', e);
          return of(false);
        })
      )
    );
  }

  private buildPayload<T>(messages: T[], partition?: number) {
    const timestamp = DateHelper.timestamp({ timezone: this.timeZone }).toString();
    return messages.map((m) => {
      const message: Message = {
        key: StringHelper.generateUUID(),
        value: JSON.stringify(m),
        headers: { country: this.countryCode },
        timestamp,
        partition
      };
      return message;
    });
  }
}
