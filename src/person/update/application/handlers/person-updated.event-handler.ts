import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PersonUpdateEvent } from '../../domain/events/person-updated.event';

@EventsHandler(PersonUpdateEvent)
export class PersonUpdatedEventHandlerLog implements IEventHandler<PersonUpdateEvent> {
  async handle(event: PersonUpdateEvent) {
    console.log(`📢 Person update: ${JSON.stringify(event.person)}`);
    // Aquí podríamos tener n event handles que realizen acciones como:
    // - Enviar un email de notificación
    // - Publicar en un sistema de mensajería (Kafka, RabbitMQ)
    // - Guardar en una tabla de auditoría
  }
}
