import { PersonCreate } from 'src/person/create/domain/dtos/person.create.dto';
import { PersonCreateCommand } from '../commands/person-create.command';

export class PersonCreateCommandToDto {
  static map(command: PersonCreateCommand): PersonCreate {
    return {
      id: command.id,
      name: command.name,
      createdAt: new Date(),
      dateOfBirth: command.birthdate
    };
  }
}
