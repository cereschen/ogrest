import { PartialType, IntersectionType, PickType } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export class CreateOrderDto extends PickType(Order, ['userId']) {}
