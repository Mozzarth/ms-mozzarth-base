import { IsUUID, IsString, IsDate, IsNotEmpty, validateSync, IsOptional } from 'class-validator';
import { StringHelper } from 'src/common/app/helper/string.helper';

export interface PersonCreateCommandProps {
  id?: string;
  name: string;
  birthdate: Date;
}

export class PersonCreateCommand {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDate()
  readonly birthdate: Date;

  private constructor(props: PersonCreateCommandProps) {
    this.name = props.name;
    this.birthdate = props.birthdate;
    this.id = props.id ?? StringHelper.generateUUID();
  }

  public static create(data: PersonCreateCommandProps): PersonCreateCommand {
    const instance = new PersonCreateCommand(data);

    const errors = validateSync(instance);
    if (errors.length > 0) throw new Error(`Validation failed: ${JSON.stringify(errors, null, 2)}`);
    return instance;
  }
}
