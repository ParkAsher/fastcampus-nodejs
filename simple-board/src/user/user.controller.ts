import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    signUp(@Body(new ValidationPipe()) data: CreateUserDto) {
        return this.userService.createUser(data);
    }

    login() {}

    me() {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }
}
