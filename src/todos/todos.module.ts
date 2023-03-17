import { TagsModule } from 'src/tags/tags.module';
import { Todo } from 'src/todos/entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), TagsModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
