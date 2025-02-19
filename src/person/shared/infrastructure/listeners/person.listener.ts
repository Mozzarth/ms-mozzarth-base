import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessageTopic } from '../../../../common/broker/infrastructure/decorators/kafka.decorator';

@Controller()
export class PersonListener {
  constructor(private readonly commandBus: CommandBus) {}

  // TODO
  @MessageTopic('create-person')
  public async readMessage(request: any) {
    console.log('Received message from Kafka:', request);
  }
}
