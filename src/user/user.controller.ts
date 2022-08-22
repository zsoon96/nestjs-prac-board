import { Controller, Get, Post, Body } from '@nestjs/common';
import {UserService} from "./user.service";

@Controller('user')
// 의존성 주입
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    // api 테스트
    @Get()
    getHelloSoon(): string {
        return this.userService.getHelloSoon();
    }

    // 유저 생성 api
    @Post()
    creteUser(@Body('id') id: number, @Body('name') name: string): User[] {
        return this.userService.creteUser(id, name);
    }
}
