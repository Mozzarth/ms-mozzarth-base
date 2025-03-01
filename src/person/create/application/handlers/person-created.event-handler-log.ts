import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PersonCreatedEvent } from '../../domain/events/person-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(PersonCreatedEvent)
export class PersonCreatedEventHandlerLog implements IEventHandler<PersonCreatedEvent> {
  private readonly logger = new Logger(PersonCreatedEventHandlerLog.name);
  async handle(event: PersonCreatedEvent) {
    this.logger.log(`📢 Person creado: ${JSON.stringify(event.person)}`);
    // Aquí podríamos tener n event handles que realizen acciones como:
    // - Enviar un email de notificación
    // - Publicar en un sistema de mensajería (Kafka, RabbitMQ)
    // - Guardar en una tabla de auditoría
  }
}
