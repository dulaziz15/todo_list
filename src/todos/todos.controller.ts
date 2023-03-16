import { TodoSearchDto } from './dto/todo-search.dto';
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
  Req,
  Query,
} from '@nestjs/common';
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
  @Get('')
  find(@Req() req, @Query() todoSearchDto: TodoSearchDto) {
    const id = req.user.userId;
    if (todoSearchDto) {
      return this.todosService.search(id, todoSearchDto)
    } else {
      return this.todosService.findAll(id);
    }

  }

  // @UseGuards(JwtAuthGuard)
  // @Get('tag')
  // findByTag(@Req() req, @Query('tag') tag: number) {
  //   const id = req.user.userId;
  //   // console.log(completed);
  //   if (tag) {
  //     // console.log(completed);
  //     return this.todosService.searchByTag(id, tag)
  //   } else {
  //     // console.log("benar");
  //     return this.todosService.findAll(id);
  //   }

  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Body('tag') tag: number[],
  ) {
    return this.todosService.update(+id, updateTodoDto, tag);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
