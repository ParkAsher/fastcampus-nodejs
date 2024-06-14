import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    signUp() {}

    login() {}

    me() {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }
}
