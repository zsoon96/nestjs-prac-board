import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 해당 파일을 통해 서버 실행
async function bootstrap() {
  // NestFactory를 사용하여 응용 프로그램 인스턴스를 만듬
  // AppModule은 애플리케이션 전체 모듈을 통합한 모듈로서, 이를 통해 전체에 모듈을 조립하고 필요한 클래스를 생성해서 서버를 실행함
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
