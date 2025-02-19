import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  database: process.env.REDIS_DB !== undefined ? process.env.REDIS_DB : 0,
  ttl: process.env.REDIS_TTL !== undefined ? process.env.REDIS_TTL : 0
}));
