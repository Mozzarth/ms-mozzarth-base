import { PersonCreatedEvent } from 'src/person/create/domain/events/person-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PersonCreatedEvent)
export class PersonCreatedEventHandlerLog implements IEventHandler<PersonCreatedEvent> {
  private readonly logger = new Logger(PersonCreatedEventHandlerLog.name);
  async handle(event: PersonCreatedEvent) {
    this.logger.log(`📢 Person creado: ${JSON.stringify(event.person)}`);
  }
}
