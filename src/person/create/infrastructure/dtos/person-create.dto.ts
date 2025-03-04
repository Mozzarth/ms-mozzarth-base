import { IdOptionalControllerDto } from 'src/common/infrastructure/controller/dto/id.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class PersonCreateControllerDto extends IdOptionalControllerDto {
  @IsString()
  @ApiProperty({ description: 'Nombre de la persona', example: 'mozzarth' })
  name: string;

  @IsDateString()
  @ApiProperty({ description: 'Fecha de nacimiento de la persona', type: 'string', format: 'date-time' })
  birthdate: Date;

  @ApiProperty({ description: 'Otra fecha', type: 'string', format: 'date-time', example: '2021-09-01T00:00:00.00-05:00' })
  otraFecha: Date;
}
