import { registerAs } from '@nestjs/config';
import { banner } from './banner';

export default registerAs('app', () => ({
  banner: banner,
  port: process.env.APP_PORT,
  host: process.env.APP_HOST,
  baseContextPath: process.env.BASE_CONTEXT_PATH
}));
