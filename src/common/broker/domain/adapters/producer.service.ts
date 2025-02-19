export interface ProducerService {
  emit<T>(topic: string, message: T, partition?: number): Promise<boolean>;
}
