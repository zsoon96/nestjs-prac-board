import {Controller, Get, Post, Body, Param, Put, Patch, Delete, ValidationPipe, UseGuards, Req} from '@nestjs/common';
import {UserService} from "./user.service";
import {AuthCredentialsDto} from "./dto/create-user.dto";
import {LoginReqDto} from "./dto/login-user.dto";
import { AuthGuard } from '@nestjs/passport';
import {GetUser} from "./get-user.decorator";

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
    signIn(@Body(ValidationPipe) loginReqDto: LoginReqDto): Promise<{accessToken:string}> {
        return this.userService.signIn(loginReqDto)
    }

    // 요청 시, 객체 정보도 함께 담아서 요청되는지 확인 api
    // UseGuards안에 @nestjs/passport에서 가져온 AuthGuard()를 이용해 요청 시, 유저 정보도 같이 담아줌! (JwtStrategy로만 유저 객체를 불러올 수 없음)
    // 유저 정보를 담아 요청을 하게 되면, 해당 정보를 통해 유저의 접근권한 등에 알맞는 처리를 할 수 있음
    @UseGuards(AuthGuard())
    @Post('/test')
    getTest(@GetUser() user:User) {
        console.log(user)
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
