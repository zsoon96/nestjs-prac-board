import { Controller, Get } from '@nestjs/common';
import {UserService} from "./user.service";

@Controller('user')
// 의존성 주입
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    getHelloSoon(): string {
        return this.userService.getHelloSoon();
    }
}
