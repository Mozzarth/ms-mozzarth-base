import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PersonCreatedEvent } from '../../domain/events/person-created.event';

@EventsHandler(PersonCreatedEvent)
export class PersonCreatedEventHandlerLog implements IEventHandler<PersonCreatedEvent> {
  async handle(event: PersonCreatedEvent) {
    console.log(`📢 Person creado: ${JSON.stringify(event.person)}`);
    // Aquí podríamos tener n event handles que realizen acciones como:
    // - Enviar un email de notificación
    // - Publicar en un sistema de mensajería (Kafka, RabbitMQ)
    // - Guardar en una tabla de auditoría
  }
}
