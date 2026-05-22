import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ];
  }
}