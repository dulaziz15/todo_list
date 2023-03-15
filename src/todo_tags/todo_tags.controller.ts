import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { TodoTagsService } from './todo_tags.service';

@Controller('todo_tags')
export class TodoTagsController {
  constructor(private readonly todoTagsService: TodoTagsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.todoTagsService.findAll();
  }
}
