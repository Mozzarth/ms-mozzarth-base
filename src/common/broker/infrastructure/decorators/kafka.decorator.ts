import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { KafkaValidationPipe } from '../config/pipes/kafka.validation.pipe';
import { BrokerLoggingInterceptor } from '../config/broker-logging.interceptor.ts';

export function MessageTopic(topic: string): any {
  return applyDecorators(MessagePattern(topic, Transport.KAFKA), UseInterceptors(BrokerLoggingInterceptor), UsePipes(KafkaValidationPipe));
}
