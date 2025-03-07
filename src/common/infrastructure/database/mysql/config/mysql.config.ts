import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  type: 'mysql',
  synchronize: false,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true
}));
