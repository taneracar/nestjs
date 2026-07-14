import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Jenna', email: 'jenna@example.com' },
    { id: 2, name: 'Dookie', email: 'dookie@example.com' },
    { id: 3, name: 'Taner', email: 'taner@example.com' },
  ];

  findAll(name?: string): User[] {
    if (!name) {
      return this.users;
    }
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findById(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const nextId = this.users.length
      ? Math.max(...this.users.map((user) => user.id)) + 1
      : 1;
    const newUser: User = { id: nextId, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findById(id);
    const updated = { ...user, ...updateUserDto };
    this.users[this.users.indexOf(user)] = updated;
    return updated;
  }

  remove(id: number): void {
    const user = this.findById(id);
    this.users = this.users.filter((u) => u.id !== user.id);
  }
}
