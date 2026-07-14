import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  //Get /user

  @Get()
  GetUsers(@Query('name') name: string) {
    const users = [
      { id: 1, name: 'Jenna' },
      { id: 2, name: 'Dookie' },
      { id: 3, name: 'Taner' },
    ];

    if (!name) {
      return users;
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }
  //Get /user/:id
  @Get(':id')
  GetUserById(@Param('id') id: number) {
    return { id: id, name: 'Taner' };
  }
  @Post()
  CreateUser(@Body() createUserDto: CreateUserDto) {
    return {
      data: createUserDto,
      message: 'success',
    };
  }
  @Put(':id')
  UpdateUser(@Param('id') id: number, @Body() UpdateUserDto: UpdateUserDto) {
    return {
      data: { id: id, ...UpdateUserDto },
      message: 'success',
    };
  }
}
