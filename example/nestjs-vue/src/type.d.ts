import { PaginatedDto } from './dto/paginated.dto';

declare global {
  type Paginated<T> = PaginatedDto<T>;
}
