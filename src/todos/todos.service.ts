import { TodoTag } from 'src/todo_tags/entities/todo_tag.entity';
import { TodoTagsService } from 'src/todo_tags/todo_tags.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';
import { Body, Injectable, Req, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {

  constructor (
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private todoTagService: TodoTagsService
  ) {}

  @UseGuards(JwtAuthGuard)
  async create(createTodoDto: CreateTodoDto, id: number): Promise<any> {
    const { tag, ...result } = createTodoDto;
    const todo = this.todoRepository.create({ ...createTodoDto, user: { id: id } });
    await this.todoRepository.save(todo);
    const id_todo = todo.id;
    // console.log(id_todo);
    return await this.todoTagService.create(id_todo, tag);
  }

  
  async findAll(id: number): Promise<Todo[]> {
    const jadi =  await this.todoRepository.find({ where: { user: { id: id } } });
    console.log(jadi);
    return jadi;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, @Body('tag') tag: number) {
    const todo = await this.todoRepository.findOne({where: {id: id}});

    if (!todo) {
      return new Error('data tidak ada');
    }

    todo.title = updateTodoDto.title;
    todo.description = updateTodoDto.description;
    todo.completed = updateTodoDto.completed;
    todo.due_time = updateTodoDto.due_time;
    const id_todo = todo.id;
    // console.log(tag);
    await this.todoRepository.save(todo);
    await this.todoTagService.delete(id_todo);
    return await this.todoTagService.create(id_todo, tag);
    // return `This action updates a #${id} tag`;
  }

  async remove(id: number) {
    await this.todoTagService.delete(id)
    return await this.todoRepository.delete(id);
  }
}
