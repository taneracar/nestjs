import { Controller, Get, Query } from '@nestjs/common';

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
  GetUser(id: number) {
    return { id: id, name: 'Taner' };
  }
}
