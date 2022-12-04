import { Injectable } from '@nestjs/common';

// 비즈니스 로직을 담당하는 서비스단
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
