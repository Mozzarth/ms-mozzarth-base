import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  tittle: 'Turbo Catalog MS',
  description: 'An API documentation related to Turbo Catalog MS.',
  path: '/doc',
  version: '1.0',
  nameTag: 'turbo-catalog-ms'
}));
