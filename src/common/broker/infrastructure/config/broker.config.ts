import { registerAs } from '@nestjs/config';

export default registerAs('broker', () => ({
  host: process.env.BROKER_HOST,
  port: process.env.BROKER_PORT,
  producer_send_timeout: process.env.BROKER_PRODUCER_SEND_TIMEOUT || 30_000
}));
