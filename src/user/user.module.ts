import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {CustomTypeOrmModule} from "../db/typeorm.module";
import {UserRepository} from "./user.repository";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Module({
  // passport 모듈은 JWT를 이용해서 인증 처리하는 등의 과정을 훨씬 수월하게 도와주는 역할
  imports: [ PassportModule.register({defaultStrategy:'jwt'}),
      JwtModule.register({
    secret: '토큰을 만들때 필요한 서버의 시크릿 키',
    signOptions: {
      expiresIn: 3600 // 1h
    }
  }),
      CustomTypeOrmModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
