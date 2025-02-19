import { registerAs } from '@nestjs/config';

export default registerAs('kafka', () => ({
  host: process.env.KAFKA_HOST,
  port: process.env.KAFKA_PORT,
  producer_send_timeout: process.env.KAFKA_PRODUCER_SEND_TIMEOUT || 30_000
}));
