import { Tag } from 'src/tags/entities/tag.entity';
import { SingleTodoDto } from './dto/single-todo.dto';
import { TodoSearchDto } from './dto/todo-search.dto';
import { TagsService } from 'src/tags/tags.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';
import { Body, Injectable, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private tagsService: TagsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTodoDto: CreateTodoDto,
    id: number,
  ): Promise<void> {
    const { tag, ...result } = createTodoDto;
    const todo = this.todoRepository.create({
      ...createTodoDto,
      user: { id: id },
    });
    const todoTags: Tag[] = [];

    for (const tags of tag) {
      const tag = await this.tagsService.findOneAndReturn(tags);

      if (!tag) {
        throw new Error('data tidak ada');
      }
      todoTags.push(tag);
    }
    todo.tags = todoTags;
    await this.todoRepository.save(todo);
  }

  async findAll(id: number) {
    const data = await this.todoRepository
      .createQueryBuilder('todo')
      .innerJoinAndSelect('todo.Todo_tags', 'todo_tag')
      .innerJoinAndSelect('todo_tag.tag', 'tag')
      .where({ user: { id: id } })
      .getMany();

    const datas = data.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      due_time: todo.due_time,
      create_at: todo.create_at,
      update_at: todo.update_at,
      delete_at: todo.delete_at,
      tags: todo.tags.map((todoTag) => ({
        id: todoTag.id,
        name: todoTag.name,
      })),
    }));

    return datas;
  }

  async search(id: number, todoSearchDto: TodoSearchDto) {
    let queryBuilder = this.todoRepository
      .createQueryBuilder('todo')
      .innerJoinAndSelect('todo.tags', 'tag')
      .where({ user: { id: id } });

    if (todoSearchDto.completed) {
      queryBuilder = queryBuilder.andWhere({
        completed: todoSearchDto.completed,
      });
    }

    if (todoSearchDto.tag) {
      queryBuilder = queryBuilder.andWhere('tag.id = :tag ', {
        tag: todoSearchDto.tag,
      });
    }

    const todos = await queryBuilder.getMany();

    return todos.map((todo) => new SingleTodoDto().FromEntity(todo));
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    @Body('tag') tag: number[],
  ): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id: id } });

    if (!todo) {
      throw new Error('data tidak ada');
    }

    todo.title = updateTodoDto.title;
    todo.description = updateTodoDto.description;
    todo.completed = updateTodoDto.completed;
    todo.due_time = updateTodoDto.due_time;

    const todoTags: Tag[] = [];

    for (const tags of tag) {
      const tag = await this.tagsService.findOneAndReturn(tags);

      if (!tag) {
        throw new Error('data tidak ada');
      }
      todoTags.push(tag);
    }
    todo.tags = todoTags;
    await this.todoRepository.save(todo);
  }

  async remove(id: number) {
    return await this.todoRepository.delete(id);
  }
}
