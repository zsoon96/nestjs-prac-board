import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {CustomTypeOrmModule} from "../db/typeorm.module";
import {UserRepository} from "./user.repository";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [ JwtModule.register({
    secret: '서버의 시크릿 키',
    signOptions: {
      expiresIn: 3600 // 1h
    }
  }),
      CustomTypeOrmModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
