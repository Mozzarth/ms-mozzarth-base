import { Body, Controller, Logger, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PersonCreateControllerDto } from 'src/person/create/infrastructure/dtos/person-create.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PersonCreateCommand } from 'src/person/create/application/commands/person-create.command';
import { PersonUpdateCommand } from 'src/person/update/application/commands/person-update.command';
import { PersonUpdateControllerDto } from 'src/person/update/infrastructure/dtos/person-update.dto';

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
  public async create(@Body() input: any) {
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
}
