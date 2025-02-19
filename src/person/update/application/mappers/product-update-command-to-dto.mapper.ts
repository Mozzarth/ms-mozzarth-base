import { PersonUpdateCommand } from '../commands/person-update.command';
import { PersonUpdateDto } from '../../domain/dtos/person.update.dto';

export class PersonUpdateCommandToDto {
  static map(command: PersonUpdateCommand): PersonUpdateDto {
    return {
      id: command.id,
      name: command.name,
      dateOfBirth: command.birthdate
    };
  }
}
