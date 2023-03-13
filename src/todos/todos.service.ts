import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';
import { Injectable, Req, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {

  constructor (
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) {}

  @UseGuards(JwtAuthGuard)
  async create(createTodoDto: CreateTodoDto, id: number): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.completed = createTodoDto.completed;
    todo.due_time = createTodoDto.due_time;
    todo.create_at = createTodoDto.create_at;
    todo.update_at = createTodoDto.update_at;
    todo.delete_at = createTodoDto.delete_at;
    todo.user_ = id;

    return await this.todoRepository.save(todo);
  }

  
  async findAll(id: number) {
    console.log(id);
    return await this.todoRepository.find({where: {user_ : id}});
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
