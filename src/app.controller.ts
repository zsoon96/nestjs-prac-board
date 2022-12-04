import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// 클라이언트에서 들어오는 요청을 받고 응답을 반환하는 컨트롤단
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
