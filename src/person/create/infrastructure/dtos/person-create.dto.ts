import { IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IdOptionalControllerDto } from 'src/common/infrastructure/controller/dto/id.dto';

export class PersonCreateControllerDto extends IdOptionalControllerDto {
  @IsString()
  @ApiPropertyOptional({ description: 'Nombre de la persona' })
  name: string;

  @ApiProperty({ description: 'Fecha de nacimiento de la persona' })
  birthdate: Date;
}
