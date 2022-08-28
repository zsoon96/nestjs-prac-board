import {CustomRepository} from "../db/typeorm.decorator";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialsDto} from "./dto/create-user.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto) {
        // dto에서 받은 값 꺼내주고
        const { username, email, password } = authCredentialsDto
        // 새로운 user 객체에 담아준 다음
        const user = this.create( {username, email, password} )

        try {
            // 저장
            await this.save(user)
        } catch (error) {
            // 이메일, 유저명 중복 시 예외 처리 (에러값/응답값 확인 필요)
            if ( error === 1062 ) {
               throw new ConflictException('이미 존재하는 이메일, 유저명입니다.')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
}