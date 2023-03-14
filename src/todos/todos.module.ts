import { TagsService } from 'src/tags/tags.service';
import { TodoTagsModule } from 'src/todo_tags/todo_tags.module';
import { TodoTagsService } from 'src/todo_tags/todo_tags.service';
import { TagsModule } from 'src/tags/tags.module';
import { Todo } from 'src/todos/entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), TodoTagsModule],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
