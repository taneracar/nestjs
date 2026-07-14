import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Jenna',
      email: 'g5TtU@example.com',
    },
    {
      id: 2,
      name: 'Dookie',
      email: 'OeCfM@example.com',
    },
    {
      id: 3,
      name: 'Taner',
      email: 'q3TlE@example.com',
    },
  ];
  findAll(name: string): User[] {
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(user: User): User {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: Partial<User>): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const user = this.users[userIndex];
    const updated = { ...user, ...updatedUser };
    this.users[userIndex] = updated;
    return updated;
  }
}
