import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData> {
  total: number;
  limit: number;

  @ApiProperty()
  results: TData[];
}
