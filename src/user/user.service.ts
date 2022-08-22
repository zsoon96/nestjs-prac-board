import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getHelloSoon(): string {
        return 'Hello soon!!';
    }
}
