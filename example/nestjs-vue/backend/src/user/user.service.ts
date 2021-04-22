import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

let data: User[] = []

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    data.push({ id: Date.now(), ...createUserDto, isActive: true })
    return;
  }

  async findAll(): Promise<Paginated<User>> {

    return { total: 1, results: data, limit: 100 };
  }

  async findOne(id: number): Promise<Paginated<User>> {

    return { total: 1, results: [data.find(item => item.id === id)], limit: 10 };
  }

  async remove(id: number): Promise<void> {
    let cur = data.findIndex(item => item.id === id)
    if (cur !== -1) {
      data.splice(cur, 1)
    }
    return
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const index = data.findIndex(item => item.id === id)
    if (index) {
      Object.assign(data[index], updateUserDto)
    }
    return
  }
}
