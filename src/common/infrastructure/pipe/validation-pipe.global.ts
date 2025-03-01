import { ValidationPipeOptions } from '@nestjs/common';

export const ValidationPipeGlobal: ValidationPipeOptions = {
  transform: true, // Transforma los DTOs automáticamente
  whitelist: true, // Elimina propiedades no definidas en el DTO
  forbidNonWhitelisted: true, // Rechaza las peticiones con propiedades desconocidas
  transformOptions: { enableImplicitConversion: true }
};
