export interface EventBrokerData<T> {
  value: T;
  partition?: number; // Partición del tópico
  timestamp: string; // Fecha en UTC ISO 8601
  source: string; // Microservicio que genera el evento
  metadata?: {
    traceId?: string; // ID de trazabilidad para debugging
  };
}
