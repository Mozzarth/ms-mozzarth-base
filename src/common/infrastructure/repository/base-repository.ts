import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationRequestDto } from '../controller/dto/pagination.dto';

export class BaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async paginate(
    query: SelectQueryBuilder<T>,
    paginationDto: PaginationRequestDto
  ): Promise<{ data: T[]; total: number; page: number; limit: number; totalPages: number }> {
    const { page, limit } = paginationDto;

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }
}
