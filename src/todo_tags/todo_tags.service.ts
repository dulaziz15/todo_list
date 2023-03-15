import { InjectRepository } from '@nestjs/typeorm';
import { TodoTag } from 'src/todo_tags/entities/todo_tag.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TodoTagsService {
  constructor(
    @InjectRepository(TodoTag)
    private todoTagRepository: Repository<TodoTag>,
  ) {}

  async create(todo_id: number, todoTags: number[]) {
    for (const tag of todoTags) {
      const todos = this.todoTagRepository.create({
        todo: { id: todo_id },
        tag: { id: tag },
      });
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

    for (const tags of tag) {
      await this.todoTagRepository.delete(tags.id);
    }

    return 'data berhasil di update';
  }
}
