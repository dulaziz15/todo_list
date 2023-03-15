import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodoTagsService } from './todo_tags.service';
import { CreateTodoTagDto } from './dto/create-todo_tag.dto';
import { UpdateTodoTagDto } from './dto/update-todo_tag.dto';

@Controller('todo_tags')
export class TodoTagsController {
  constructor(private readonly todoTagsService: TodoTagsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.todoTagsService.findAll();
  }
}
