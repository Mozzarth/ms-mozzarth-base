import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // app
  BASE_CONTEXT_PATH: Joi.string(),
  APP_PORT: Joi.number().required(),
  TIME_ZONE: Joi.string().required(),
  COUNTRY_CODE: Joi.string().required(),

  // Database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  // Microservices
  INTERNAL_MICROSERVICES_URL: Joi.string().required(),

  // broker
  BROKER_PORT: Joi.number().required(),
  BROKER_HOST: Joi.string().required(),
  BROKER_PRODUCER_SEND_TIMEOUT: Joi.number().required(),

  // Cache
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),

  // Otel collector
  OTEL_EXPORTER_OTLP_PORT: Joi.number().required(),
  OTEL_EXPORTER_OTLP_HOST: Joi.string().required()
});
