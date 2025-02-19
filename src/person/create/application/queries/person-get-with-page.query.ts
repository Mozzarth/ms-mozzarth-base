import { PaginationDto } from 'src/common/domain/pagination/pagination.dto';

export class GetRouteCostWithPageQuery {
  constructor(public readonly page: PaginationDto) {}
}
