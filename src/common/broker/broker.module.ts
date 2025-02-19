import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BROKER } from './infrastructure/config/broker.enum';
import { BrokerConfigService } from './infrastructure/config/broker.config.service';
import { BrokerConfigModule } from './infrastructure/config/broker.config.module';
import { KafkaProducerService } from './infrastructure/connection/kafka-producer.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: BROKER.SERVICE.toString(),
        inject: [BrokerConfigService],
        imports: [BrokerConfigModule],
        useFactory: async (config: BrokerConfigService) => ({
          name: config.name,
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: config.client_id,
              brokers: [`${config.host}:${config.port}`]
            },
            consumer: {
              groupId: config.consumer_group_id,
              heartbeatInterval: config.heartbeat_interval
            }
          }
        })
      }
    ])
  ],
  providers: [{ provide: 'ProducerService', useClass: KafkaProducerService }],
  exports: ['ProducerService']
})
export class BrokerModule {}
