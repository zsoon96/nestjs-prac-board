import {CustomRepository} from "../db/typeorm.decorator";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialsDto} from "./dto/create-user.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto) {
        // dto에서 받은 값 꺼내주고
        const { username, email, password } = authCredentialsDto

        // 비밀번호 암호화 (솔트+비밀번호를 통한 보안성 강화)
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        // 새로운 user 객체에 해당 정보를 담아준 다음
        const user = this.create( {username, email, password: hashedPassword} )

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

    // 이메일로 유저정보 찾기
    async findOneByEmail(email: any) {
        return await this.findOne({
            where: {
                email: email,
            },
        })
    }
}