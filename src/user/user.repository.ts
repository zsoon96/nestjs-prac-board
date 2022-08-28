import {CustomRepository} from "../db/typeorm.decorator";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialsDto} from "./dto/create-user.dto";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto) {
        // dto에서 받은 값 꺼내주고
        const { username, email, password } = authCredentialsDto
        // 새로운 user 객체에 담아준 다음
        const user = this.create( {username, email, password} )
        // 저장
        await this.save(user)
    }
}