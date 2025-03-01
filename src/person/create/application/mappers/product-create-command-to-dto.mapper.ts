import { PersonCreate } from 'src/person/create/domain/dtos/person.create.dto';
import { PersonCreateCommand } from '../commands/person-create.command';
import { StringHelper } from 'src/common/app/helper/string.helper';

export class PersonCreateCommandToDto {
  static map(command: PersonCreateCommand): PersonCreate {
    return {
      name: command.name,
      createdAt: new Date(),
      dateOfBirth: command.birthdate,
      id: command.id ?? StringHelper.generateUUID()
    };
  }
}
