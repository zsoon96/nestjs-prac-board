import { Injectable } from '@nestjs/common';

const users: User[] = [
    { id: 1, name: '유저1'},
    { id: 2, name: '유저2'},
    { id: 3, name: '유저3'}
]


@Injectable()
export class UserService {
    getHelloSoon(): string {
        return 'Hello soon!!';
    }

    creteUser(id: number, name: string): User[] {
        return users.concat({ id, name }); // concat(): 배열 합치는 함수
    }
}
