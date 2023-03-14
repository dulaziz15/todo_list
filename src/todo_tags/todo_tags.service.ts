import { InjectRepository } from '@nestjs/typeorm';
import { TodoTag } from 'src/todo_tags/entities/todo_tag.entity';
import { Body, Injectable } from '@nestjs/common';
import { CreateTodoTagDto } from './dto/create-todo_tag.dto';
import { UpdateTodoTagDto } from './dto/update-todo_tag.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodoTagsService {

  constructor(
    @InjectRepository(TodoTag)
    private todoTagRepository: Repository<TodoTag>
  ) {}

  async create(id_todo: number,tag: number) {
    const todos = this.todoTagRepository.create({ todo: {id: id_todo}, tag: {id: tag}});
    // console.log(id_todo);
    // console.log(tag);
    return await this.todoTagRepository.save(todos);
  }

  findAll() {
    return `This action returns all todoTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoTag`;
  }

  update(id: number, updateTodoTagDto: UpdateTodoTagDto) {
    return `This action updates a #${id} todoTag`;
  }

  async delete(id: number) {
    const tag = await this.todoTagRepository.findOne({ where: {  todo : { id: id } } })
    const id_tag = tag.id;
    if(tag) {
      return  await this.todoTagRepository.delete(id_tag);
    }

  }
}
