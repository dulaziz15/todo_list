import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Param, Post, UseGuards, Req, Put, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private jwtService: JwtService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard())
  @Get('')
  async getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard())
  @Patch('')
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const id = req.user.userId;
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async delete(@Req() req) {
    const id = req.user.userId;
    return this.usersService.delete(id);
  }
}
