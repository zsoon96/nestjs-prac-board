import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {CustomTypeOrmModule} from "../db/typeorm.module";
import {UserRepository} from "./user.repository";

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
