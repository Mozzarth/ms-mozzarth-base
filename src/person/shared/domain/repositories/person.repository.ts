import { Person } from 'src/person/shared/domain/person.domain';
import { PersonUpdateDto } from '../../../update/domain/dtos/person.update.dto';
import { PaginationDto } from 'src/common/domain/pagination/pagination.dto';
import { PersonCreate } from 'src/person/create/domain/dtos/person.create.dto';

export interface PersonRepository {
  save(person: PersonCreate): Promise<Person>;
  update(person: PersonUpdateDto): Promise<void>;
  findOne(criteria: Partial<Person>): Promise<Person | null>;
  find(criteria: Partial<Person> & PaginationDto): Promise<Person[]>;
}
