import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/create-user.dto";
import {User} from "./user.entity";
import {LoginReqDto} from "./dto/login-user.dto";
import * as bcrypt from 'bcryptjs';

// const users: User[] = [
//     { id: 1, name: '유저1'},
//     { id: 2, name: '유저2'},
//     { id: 3, name: '유저3'}
// ]


@Injectable()
export class UserService {

    // Repository 주입
    constructor(private userRepository: UserRepository) {}

    // 회원가입 처리 로직
    async signUp(authCredentialsDto: AuthCredentialsDto) {
        return this.userRepository.createUser(authCredentialsDto)
    }

    // 로그인 처리 로직
    async signIn(LoginReqDto: LoginReqDto) : Promise<string>{
        const {email, password} = LoginReqDto
        const user = await this.userRepository.findOneBy({email})

        if ( user && await bcrypt.compare(password, user.password)) {
            return '로그인 성공!'
        } else {
            throw new UnauthorizedException('로그인 실패')
        }
    }

    // getHelloSoon(): string {
    //     return 'Hello soon!!';
    // }

    // creteUser(id: number, name: string): User[] {
    //     return users.concat({ id, name }); // concat(): 배열 합치는 함수
    // }

    // getUserAll(): User[] {
    //     return users;
    // }

    // getUserOne(id: number): User {
    //     return users.find((data) => data.id == id);
    // }

    // setAllUser(id:number, name:string): User[] {
    //     // map 함수: 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
    //    return users.map((data)=>{
    //        // 동일한 id가 있으면, 새로 요청한 값으로 이름 변경
    //         if (data.id == id) {
    //             data.name = name;
    //         }
    //         // 없으면 기존 데이터로 유지
    //         return {
    //             id: data.id,
    //             name: data.name
    //         }
    //     })
    // }

    // setUser(id: number, name: string): User {
    //     return users.find((data) => {
    //         if (data.id == id)
    //             return data.name = name;
    //     })
    // }

    // deleteUser(id: number): User[] {
    //     return users.filter((data) => data.id != id);
    // }
}
