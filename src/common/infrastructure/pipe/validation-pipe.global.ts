import { ValidationPipeOptions } from '@nestjs/common';

export const ValidationPipeGlobal: ValidationPipeOptions = {
  transform: true, // Transforma los DTOs automáticamente
  whitelist: true, // Elimina propiedades no definidas en el DTO
  forbidNonWhitelisted: false, // Rechaza las peticiones con propiedades desconocidas
  transformOptions: { enableImplicitConversion: true } // Convierte los tipos de datos automáticamente
};
