import { Body, Controller, Logger, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PersonCreateControllerDto } from 'src/person/create/infrastructure/dtos/person-create.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PersonCreateCommand } from 'src/person/create/application/commands/person-create.command';
import { PersonUpdateDto } from 'src/person/update/domain/dtos/person.update.dto';
import { PersonUpdateCommand } from 'src/person/update/application/commands/person-update.command';
import { PersonUpdateControllerDto } from 'src/person/update/infrastructure/dtos/person-update.dto';
import { MessageTopic } from 'src/common/broker/infrastructure/decorators/kafka.decorator';

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
    return await this.commandBus.execute(PersonCreateCommand.create(input));
  }

  @Put('')
  @ApiOkResponse({
    status: 200,
    description: 'Update person'
  })
  public async update(@Body() input: PersonUpdateControllerDto) {
    return await this.commandBus.execute(PersonUpdateCommand.create(input));
  }

  // @MessageTopic(InventoryEvent.WORKER_EXECUTION)
}
