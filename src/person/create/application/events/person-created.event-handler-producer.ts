import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProducerService } from 'src/common/broker/domain/adapters/producer.service';
import { Inject, Logger } from '@nestjs/common';
import { PersonCreatedEvent } from 'src/person/create/domain/events/person-created.event';
import { Person } from 'src/person/shared/domain/person.domain';
import { StringHelper } from 'src/common/app/helper/string.helper';
import { PERSON_EVENT, PERSON_EVENTS } from 'src/person/shared/domain/person.event';

@EventsHandler(PersonCreatedEvent)
export class PersonCreatedEventHandlerProducer implements IEventHandler<PersonCreatedEvent> {
  private readonly logger = new Logger(PersonCreatedEventHandlerProducer.name);

  constructor(@Inject('ProducerService') private readonly producerService: ProducerService) {}

  async handle(event: PersonCreatedEvent) {
    this.logger.log(`📢 Person creado emitiendo evento: ${JSON.stringify(event.person)}`);
    await this.producerService.emit<Person>(PERSON_EVENT, {
      version: '1.0.0',
      data: event.person,
      eventId: StringHelper.generateUUID(),
      eventType: PERSON_EVENTS.PERSON_CREATED
    });
  }
}
