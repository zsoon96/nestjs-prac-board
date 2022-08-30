import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {ExtractJwt} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // 받아온 토큰을 통해 유저정보를 조회하기 위해 repository 주입
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            // 토큰이 유효한지 확인하기 위한 시크릿 키
            secretOrKey: '서버의 시크릿 키',
            // 토큰을 받아올 경로
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    // 토큰 확인이 완료되면, payload에 있는 유저의 email로 조회 후, 일치하는 정보가 있으면 유저 객체를 반환
    async validate(payload) {
        const {email} = payload
        const user: User = await this.userRepository.findOneByEmail(email)

        if (!user) {
            throw new UnauthorizedException();
        }

        return user
    }
}