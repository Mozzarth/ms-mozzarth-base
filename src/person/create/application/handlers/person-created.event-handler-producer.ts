import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PersonCreatedEvent } from '../../domain/events/person-created.event';
import { ProducerService } from 'src/common/broker/domain/adapters/producer.service';
import { Inject, Logger } from '@nestjs/common';

@EventsHandler(PersonCreatedEvent)
export class PersonCreatedEventHandlerProducer implements IEventHandler<PersonCreatedEvent> {
  private readonly logger = new Logger(PersonCreatedEventHandlerProducer.name);

  constructor(@Inject('ProducerService') private readonly producerService: ProducerService) {}

  async handle(event: PersonCreatedEvent) {
    this.logger.log(`📢 Person creado: ${JSON.stringify(event.person)}`);
    // await this.producerService.emit('person-created', event.person);
  }
}
