import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

// 프로젝트 최상위 모듈
@Module({
  // db 설정값 넣어주기 > 별도의 지정 설정값이 없으면 ormconfig.json 자동으로 찾아서 실행
  // forRoot안에 넣어준 설정은 모든 sub-module 부수적인 모듈들에 모두 적용됨
  imports: [TypeOrmModule.forRoot(),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
