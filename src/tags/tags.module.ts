import { TodosModule } from './../todos/todos.module';
import { Tag } from 'src/tags/entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService]
})
export class TagsModule {}
