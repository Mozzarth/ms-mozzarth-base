import { Person } from 'src/person/shared/domain/person.domain';
import { PersonEntity } from '../entities/person.entity';

export class PersonEntityToDomain {
  public static map(entity: PersonEntity): Person {
    return new Person({
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      dateOfBirth: entity.dateOfBirth
    });
  }
}
