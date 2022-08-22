import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

    // 전체 유저 조회 api
    @Get('/user_all')
    getUserAll(): User[] {
        return this.userService.getUserAll();
    }
    // 단일 유저 조회 api
    @Get('/user/:id')
    getUserOne(@Param('id') id: number): User {
        return this.userService.getUserOne(id);
    }

}
