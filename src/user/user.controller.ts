import {Controller, Get, Post, Body, Param, Put, Patch, Delete, ValidationPipe} from '@nestjs/common';
import {UserService} from "./user.service";
import {AuthCredentialsDto} from "./dto/create-user.dto";
import {LoginReqDto} from "./dto/login-user.dto";

@Controller('user')
// 의존성 주입
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    // 회원가입 api
    @Post('/signup')
    signUp (@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : string {
        this.userService.signUp(authCredentialsDto)
        return '회원가입 성공!'
    }

    // 로그인 api
    @Post('/login')
    signIn(@Body(ValidationPipe) loginReqDto: LoginReqDto) {
        return this.userService.signIn(loginReqDto)
    }

    // api 테스트
    // @Get()
    // getHelloSoon(): string {
    //     return this.userService.getHelloSoon();
    // }

    // 유저 생성 api
    // @Post()
    // creteUser(@Body('id') id: number, @Body('name') name: string): User[] {
    //     return this.userService.creteUser(id, name);
    // }

    // 전체 유저 조회 api
    // @Get('/user_all')
    // getUserAll(): User[] {
    //     return this.userService.getUserAll();
    // }

    // 단일 유저 조회 api
    // @Get('/user/:id')
    // getUserOne(@Param('id') id: number): User {
    //     return this.userService.getUserOne(id);
    // }

    // 전체 유저 수정 api
    // @Put('/user/update')
    // setAllUser(@Body('id') id:number, @Body('name') name:string): User[] {
    //     return this.userService.setAllUser(id,name);
    // }

    // 단일 유저 수정 api
    // @Patch('/user/:id')
    // setUser(@Param('id') id:number, @Body('name') name:string): User {
    //     return this.userService.setUser(id,name);
    // }

    // 유저 삭제 api
    // @Delete('/user/:id')
    // deleteUser(@Param('id') id:number): User[] {
    //     return this.userService.deleteUser(id);
    // }

}
