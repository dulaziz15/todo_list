import { UpdateUserDto } from './dto/update-todo.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    await this.userRepository.save(createUserDto);
    return 'User berhasil dibuat';
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('data tidak ditemukan');
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;

    await this.userRepository.save(user);

    return `This action updates a #${id} user`;
  }

  async findByEmail(email: string, password: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
