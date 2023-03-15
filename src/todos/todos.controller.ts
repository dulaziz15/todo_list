import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    const id = req.user.userId;
    return this.todosService.create(createTodoDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  find(@Req() req) {
    const id = req.user.userId;
    return this.todosService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Body('tag') tag: number[]) {
    return this.todosService.update(+id, updateTodoDto, tag);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
