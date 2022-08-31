// import하는 모듈 확인 잘하기 !
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {ExtractJwt, Strategy} from "passport-jwt";

import * as config from 'config';

const jwtConfig = config.get('jwt')

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // 받아온 토큰을 통해 유저정보를 조회하기 위해 repository 주입
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            // 토큰이 유효한지 확인하기 위한 시크릿 키
            secretOrKey: jwtConfig.secret,
            // 토큰을 받아올 경로
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    // 토큰 확인이 완료되면, payload에 있는 유저의 email로 조회 후, 일치하는 정보가 있으면 유저 객체를 반환
    async validate(payload) {
        const { email } = payload
        const user = await this.userRepository.findOneByEmail(email)

        if (!user) {
            throw new UnauthorizedException();
        }
        // 요청에 해당 객체 정보(id,username,password) 담아주기 > @UseGuard(인증 미들웨어) & @GetUser(커스텀 데코레이터) 함께 사용해야 올바르게 객체 정보 들어감
        return user
    }
}