import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IdControllerDto {
  @IsString({ message: 'El id debe ser un string' })
  @ApiProperty({ description: 'Identificador único, idepotencia' })
  id: string;
}
export class IdOptionalControllerDto {
  @IsOptional({ message: 'El id es opcional' })
  @IsString({ message: 'El id debe ser un string' })
  @ApiPropertyOptional({ description: 'Identificador único, idepotencia' })
  id?: string;
}
