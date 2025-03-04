import { Body, Controller, Logger, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PersonCreateCommand } from 'src/person/create/application/commands/person-create.command';
import { PersonUpdateCommand } from 'src/person/update/application/commands/person-update.command';
import { PersonUpdateControllerDto } from 'src/person/update/infrastructure/dtos/person-update.dto';
import { PersonCreateControllerDto } from 'src/person/create/infrastructure/dtos/person-create.dto';
import { MessageTopic } from 'src/common/broker/infrastructure/decorators/kafka.decorator';
import { PERSON_EVENT, PERSON_EVENTS } from '../../domain/person.event';
import { EventPayload } from 'src/common/broker/domain/adapters/producer.service';
import { Person } from '../../domain/person.domain';

@Controller('person')
@ApiTags('Person')
export class PersonController {
  private readonly logger = new Logger(PersonController.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Post('')
  @ApiOkResponse({
    status: 200,
    description: 'Create person'
  })
  public async create(@Body() input: PersonCreateControllerDto) {
    this.logger.log(`Creating person with data: ${JSON.stringify(input)}`);
    return this.commandBus.execute(PersonCreateCommand.create(input));
  }

  @Put('')
  @ApiOkResponse({
    status: 200,
    description: 'Update person'
  })
  public async update(@Body() input: PersonUpdateControllerDto) {
    return this.commandBus.execute(PersonUpdateCommand.create(input));
  }

  @MessageTopic(PERSON_EVENT)
  public async onPerson(data: EventPayload<any>) {
    // Ejemplo de como consume en otro ms incluso en el mismo microservicio a traves del worker
    this.logger.log(`Received event:${PERSON_EVENT} data:${JSON.stringify(data)}`);

    if (data.eventType === PERSON_EVENTS.PERSON_CREATED) {
      // Aqui regresamos la ejecucion del evento en un comando.
      const event: Person = data.data;
      return this.logger.log(`Person created: ${JSON.stringify(event)}`);
    }

    this.logger.warn(`Event not handled: ${JSON.stringify(data)}`);
  }
}
