import { IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IdControllerDto {
  @IsUUID('4', { message: 'El id debe ser un UUID v4' })
  @ApiProperty({ description: 'Identificador único, idepotencia' })
  id: string;
}
export class IdOptionalControllerDto {
  @IsOptional({ message: 'El id es opcional' })
  @IsUUID('4', { message: 'El id debe ser un UUID v4' })
  @ApiPropertyOptional({ description: 'Identificador único, idepotencia' })
  id?: string;
}
