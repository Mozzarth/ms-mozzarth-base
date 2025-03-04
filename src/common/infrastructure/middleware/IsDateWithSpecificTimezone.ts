import { registerDecorator, ValidationOptions } from 'class-validator';
import * as moment from 'moment-timezone';

export function IsDateWithSpecificTimezone(validationOptions?: ValidationOptions & { timezone?: string }) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateWithSpecificTimezone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const envTimezone = validationOptions?.timezone || process.env.TZ;
          if (!envTimezone) {
            console.warn('⚠️ No se especificó un timezone para la validación de fechas, puede usar la variable de entorno TZ');
            return false;
          }
          const parsedDate = moment.tz(value, moment.ISO_8601, envTimezone);
          return parsedDate.isValid() && parsedDate.tz() === envTimezone;
        },
        defaultMessage(): string {
          return `La fecha debe estar en formato ISO 8601 y contener el timezone correcto (${process.env.TZ}) ej: ${moment().tz(process.env.TZ).format()}`;
        }
      }
    });
  };
}
