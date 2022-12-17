import {Test, TestingModule} from "@nestjs/testing"
import {DynamicModule, INestApplication, ValidationPipe} from "@nestjs/common";
import * as request from 'supertest';
import {AppModule} from "src/app.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CreateBoardDto} from "./boards/dto/create-board.dto";

// 테스트 서버 설정
export function getTestMysqlModule(): DynamicModule {
    return TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: 'test',
        database: 'e2e',
        entities: ['__dirname + /../**/*.entity.{js,ts}'],
        synchronize: true,
    });
}

// end-to-end 테스트: 사용자 입장에서 페이지간의 연결성 등 모든 시스템을 테스팅
describe ('BoardsController e2e test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        // 테스트 실행전, 테스트 모듈 생성 (프로젝트 환경과 동일하게 세팅)
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        // 컴파일 후, app 생성 및 초기화
        app = module.createNestApplication()
        app.useGlobalPipes(new ValidationPipe())
        await app.init()
    })

    afterAll( async() => {
        await app.close()
    })

    it ('Get - /boards', () => {
        // supertest 라이브러리 활용 - http 요청 시뮬레이션
        return request(app.getHttpServer())
            .get('/boards')
            .expect(200)
            // .expect([])
    })

    it ('POST - /boards', () => {
        const createBoardDto: CreateBoardDto = {
            title: '제목',
            description: '내용'
        }

        const user: User = {
            id: 1,
            name: '사용자'
        }

        return request(app.getHttpServer())
            .post('/boards')
            .send(createBoardDto)
            .send(user)
            .expect(201)
    })
})