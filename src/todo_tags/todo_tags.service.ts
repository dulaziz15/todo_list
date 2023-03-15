import { Tag } from './../tags/entities/tag.entity';
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
    private todoTagRepository: Repository<TodoTag>,
  ) {}


  async create(todo_id: number,todoTags: number[]) {
    // console.log(todoTags);

    for(const tag of todoTags){
      // console.log(tag);
      const todos = this.todoTagRepository.create({ todo: {id: todo_id}, tag: {id: tag}});
      await this.todoTagRepository.save(todos);
    }

    }

  async findAll(): Promise<TodoTag[]> {
    return await this.todoTagRepository.find();
  }

  async delete(id_todo: number) {
    const tag = await this.todoTagRepository.find({
      where: { todo: { id: id_todo } },
    });
    const id_tag = tag;

    for (const tags of tag) {
      await this.todoTagRepository.delete(tags.id);
    }
    
    return "data berhasil di update";
  }

}
