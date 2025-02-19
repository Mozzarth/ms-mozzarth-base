import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // app
  BASE_ENVIRONMENT: Joi.string().default('DEVELOPMENT'),
  BASE_CONTEXT_PATH: Joi.string().default('api/turbo-catalog-ms'),
  COUNTRY_CODE: Joi.string().required(),
  TIME_ZONE: Joi.string().required(),
  APP_PORT: Joi.number().default(8080),
  APP_HOST: Joi.string().default('0.0.0.0'),
  INTERNAL_MICROSERVICES_URL: Joi.string().required(),

  // Relational DB
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required().default('turbo_catalog_ms'),

  // Cache
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required()
});
