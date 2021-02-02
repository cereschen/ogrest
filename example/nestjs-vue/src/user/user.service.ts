import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<Paginated<User>> {
    const [results, total] = await this.usersRepository.findAndCount({
      where: {},
      relations: ['orders'],
      skip: 1,
      take: 100,
    });
    return { total, results, limit: 100 };
  }

  async findOne(id: string): Promise<Paginated<User>> {
    const res = await this.usersRepository.findOne(+id, {
      relations: ['orders'],
    });
    return { total: 1, results: [res], limit: 10 };
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(+id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(+id, updateUserDto);
  }
}
