import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PersonCreatedEvent } from '../../domain/events/person-created.event';

@EventsHandler(PersonCreatedEvent)
export class PersonCreatedHandler implements IEventHandler<PersonCreatedEvent> {
  async handle(event: PersonCreatedEvent) {
    console.log(`📢 Person creado: ${event.person.id}: ${event.person.name}`);
    // Aquí podríamos hacer otras acciones como:
    // - Enviar un email de notificación
    // - Publicar en un sistema de mensajería (Kafka, RabbitMQ)
    // - Guardar en una tabla de auditoría
  }
}
