import {Controller, Get, Post, Body, Param, Put, Patch} from '@nestjs/common';
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

    // 전체 유저 수정 api
    @Put('/user/update')
    setAllUser(@Body('id') id:number, @Body('name') name:string): User[] {
        return this.userService.setAllUser(id,name);
    }

    // 단일 유저 수정 api
    @Patch('/user/:id')
    setUser(@Param('id') id:number, @Body('name') name:string): User {
        return this.userService.setUser(id,name);
}


}
