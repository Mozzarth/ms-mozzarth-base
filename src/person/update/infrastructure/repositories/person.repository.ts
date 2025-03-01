import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PersonEntity } from '../entities/person.entity';
import { BaseRepository } from 'src/common/infrastructure/repository/base-repository';
import { PersonCreate } from 'src/person/create/domain/dtos/person.create.dto';
import { Person } from 'src/person/shared/domain/person.domain';
import { PaginationDto } from 'src/common/domain/pagination/pagination.dto';
import { PersonEntityToDomain } from '../mapper/person-entity-to-domain.mapper';
import { PersonRepository } from 'src/person/shared/domain/repositories/person.repository';
import { PersonUpdateDto } from '../../domain/dtos/person.update.dto';

@Injectable()
export class RouteCostMySqlRepository extends BaseRepository<PersonEntity> implements PersonRepository {
  constructor(@InjectRepository(PersonEntity) repository: Repository<PersonEntity>) {
    super(repository);
  }
  update(person: PersonUpdateDto): Promise<void> {
    return this.repository.update(person.id, person).then(() => {});
  }
  save(person: PersonCreate): Promise<Person> {
    return this.repository.save(person).then((entity) => PersonEntityToDomain.map(entity));
  }

  findOne(criteria: Partial<Person>): Promise<Person | null> {
    return this.repository.findOne({ where: criteria }).then((entity) => entity && PersonEntityToDomain.map(entity));
  }

  find(criteria: Partial<Person> & PaginationDto): Promise<Person[]> {
    return this.repository.find({ where: criteria }).then((entities) => entities.map((entity) => PersonEntityToDomain.map(entity)));
  }
}
