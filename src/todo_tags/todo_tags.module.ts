import { TodosModule } from './../todos/todos.module';
import { TodoTag } from 'src/todo_tags/entities/todo_tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodoTagsService } from './todo_tags.service';
import { TodoTagsController } from './todo_tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoTag])],
  controllers: [TodoTagsController],
  providers: [TodoTagsService],
  exports: [TodoTagsService]
})
export class TodoTagsModule {}
