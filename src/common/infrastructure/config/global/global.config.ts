import { registerAs } from '@nestjs/config';

export default registerAs('global', () => ({
  timezone: process.env.TIME_ZONE,
  internal_ms_url: process.env.INTERNAL_MICROSERVICES_URL
}));
