export interface EventPayload<T> {
  eventId: string; // UUID único del evento
  version: string; // Versión del esquema del evento
  eventType: string; // Tipo de evento (ej: "ORDER_CREATED")
  data: T; // Carga útil del evento (puede ser cualquier tipo)
}

export interface ProducerService {
  emit<T>(topic: string, message: EventPayload<T>, partition?: number): Promise<boolean>;
}
