import { IsUUID, IsString, IsDate, validateSync, IsOptional } from 'class-validator';
import { PersonCreateCommandProps } from 'src/person/create/application/commands/person-create.command';

interface PersonUpdateCommandProps extends Partial<PersonCreateCommandProps> {
  id: string;
}

export class PersonUpdateCommand {
  @IsUUID()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly name: string | undefined;

  @IsDate()
  @IsOptional()
  readonly birthdate: Date | undefined;

  private constructor(props: PersonUpdateCommandProps) {
    this.id = props.id;
    this.name = props.name;
    this.birthdate = props.birthdate;
  }

  public static create(data: PersonUpdateCommandProps): PersonUpdateCommand {
    const instance = new PersonUpdateCommand(data);

    const errors = validateSync(instance);
    if (errors.length > 0) throw new Error(`Validation failed: ${JSON.stringify(errors, null, 2)}`);
    return instance;
  }
}
