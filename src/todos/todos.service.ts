import { TodoSearchDto } from './dto/todo-search.dto';
import { TodoTag } from './../todo_tags/entities/todo_tag.entity';
import { TagsService } from 'src/tags/tags.service';
import { TodoTagsService } from 'src/todo_tags/todo_tags.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository, QueryBuilder } from 'typeorm';
import { Body, Injectable, Param, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private todoTagService: TodoTagsService,
    private tagsService: TagsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  async create(@Body() createTodoDto: CreateTodoDto, id: number): Promise<any> {
    const { tag, ...result } = createTodoDto;
    const todo = this.todoRepository.create({
      ...createTodoDto,
      user: { id: id },
    });
    await this.todoRepository.save(todo);
    // console.log(id_todo);
    const todo_id = todo.id;
    const todoTags = [];

    for (const tags of tag) {
      const tag = await this.tagsService.findOne(tags);

      if (!tag) {
        throw new Error('data tidak ada');
      }
      todoTags.push(tags);
    }
    return await this.todoTagService.create(todo_id, todoTags);
  }

  async findAll(id: number) {
    let data = await this.todoRepository
      .createQueryBuilder('todo')
      .innerJoinAndSelect('todo.Todo_tags', 'todo_tag')
      .innerJoinAndSelect('todo_tag.tag', 'tag')
      .where({ user: { id: id } })
      .getMany();

      const datas = data.map(todo => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        due_time: todo.due_time,
        create_at: todo.create_at,
        update_at: todo.update_at,
        delete_at: todo.delete_at,
        tags: todo.Todo_tags.map(todoTag => ({
          id: todoTag.tag.id,
          name: todoTag.tag.name,
        })),
      }));

      return datas;
  }

  async search (
    id: number,
    todoSearchDto: TodoSearchDto
  ) {
    let queryBuilder = await this.todoRepository
    .createQueryBuilder('todo')
      .innerJoinAndSelect('todo.Todo_tags', 'todo_tag')
      .innerJoinAndSelect('todo_tag.tag', 'tag')
      .where({ user: { id: id } })

    if (todoSearchDto.completed) {
      const queryBuilder2 = await queryBuilder
      .where({ completed: todoSearchDto.completed })
      .getMany();

      const datas = queryBuilder2.map(todo => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        due_time: todo.due_time,
        create_at: todo.create_at,
        update_at: todo.update_at,
        delete_at: todo.delete_at,
        tags: todo.Todo_tags.map(todoTag => ({
          id: todoTag.tag.id,
          name: todoTag.tag.name,
        })),
      }));

      if (todoSearchDto.tag) {
        const datas = queryBuilder2.map(todo => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          due_time: todo.due_time,
          create_at: todo.create_at,
          update_at: todo.update_at,
          delete_at: todo.delete_at,
          tags: todo.Todo_tags.map(todoTag => ({
            id: todoTag.tag.id,
            name: todoTag.tag.name,
          })),
        }));

        const jadi = [];
        
        for (const data of datas) {
          const data1 = data.tags;
          for (const data2 of data1){
            if(data2.id == todoSearchDto.tag) {
              const data4 = datas.filter(datas => datas.tags === data1);
              jadi.push(data4);
            }
          }
        }

        return jadi;

      }

      return datas;
    }

    if(todoSearchDto.tag) {
      const queryBuilderTag = await queryBuilder.getMany();

      const datas = queryBuilderTag.map(todo => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          due_time: todo.due_time,
          create_at: todo.create_at,
          update_at: todo.update_at,
          delete_at: todo.delete_at,
          tags: todo.Todo_tags.map(todoTag => ({
            id: todoTag.tag.id,
            name: todoTag.tag.name,
          })),
        }));

        const jadi = [];
        
        for (const data of datas) {
          const data1 = data.tags;
          for (const data2 of data1){
            if(data2.id == todoSearchDto.tag) {
              const data4 = datas.filter(datas => datas.tags === data1);
              jadi.push(data4);
            }
          }
        }

        return jadi;
    }
  }

  async searchByTag(id: number, todoSearchDto: TodoSearchDto) {
    console.log("data")
  }


  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    @Body('tag') tag: number[],
  ) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });

    if (!todo) {
      return new Error('data tidak ada');
    }

    todo.title = updateTodoDto.title;
    todo.description = updateTodoDto.description;
    todo.completed = updateTodoDto.completed;
    todo.due_time = updateTodoDto.due_time;
    const id_todo = todo.id;

    await this.todoRepository.save(todo);
    await this.todoTagService.delete(id_todo);

    const todo_id = todo.id;
    const todoTags = [];

    for (const tags of tag) {
      const tag = await this.tagsService.findOne(tags);

      if (!tag) {
        throw new Error('data tidak ada');
      }
      todoTags.push(tags);
    }

    return await this.todoTagService.create(todo_id, todoTags);
  }

  async remove(id: number) {
    await this.todoTagService.delete(id);
    return await this.todoRepository.delete(id);
  }
}
