import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventPayload, ProducerService } from 'src/common/broker/domain/adapters/producer.service';
import { ClientKafka } from '@nestjs/microservices';
import { StringHelper } from 'src/common/app/helper/string.helper';
import { RecordMetadata } from '@nestjs/microservices/external/kafka.interface';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map, of, timeout } from 'rxjs';
import { EventBrokerData } from '../event.event';
import { BROKER } from '../config/broker.enum';

@Injectable()
export class KafkaProducerService implements OnApplicationBootstrap, ProducerService {
  private readonly timeout: number;
  protected logger = new Logger(KafkaProducerService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject('KAFKA_SERVICE') private readonly clientKafka: ClientKafka
  ) {
    this.timeout = Number(this.configService.get<number>('kafka.producer_send_timeout'));
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.clientKafka.connect();
    this.logger.log('Kafka Client Connected');
  }

  public async emit<T = any>(topic: string, message: EventPayload<T>, partition?: number): Promise<boolean> {
    const payload = this.buildPayload(message, partition);
    return firstValueFrom(
      this.clientKafka.emit(topic, payload).pipe(
        timeout(this.timeout),
        map((result: RecordMetadata[]) => {
          if (result[0].errorCode != 0) return false;
          this.logger.log(`-> Sending message [${topic}]: ${payload}`);
          return true;
        }),
        catchError((e) => {
          this.logger.error('Error in kafka emit', e);
          return of(false);
        })
      )
    );
  }

  private buildPayload<T>(value: T, partition?: number): EventBrokerData<T> {
    return {
      value,
      partition,
      source: BROKER.NAME.toString(),
      timestamp: new Date().toISOString(),
      metadata: { traceId: StringHelper.generateUUID() }
    };
  }
}
