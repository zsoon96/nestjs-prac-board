import {Test, TestingModule} from "@nestjs/testing";
import {BoardsService} from "./boards.service";
import {BoardRepository} from "./board.repository";

// repository 관련 가짜 함수 정의
// const mockRepository = () => ({
//     create: jest.fn(),
//     save: jest.fn(),
//     find: jest.fn(),
// })

const mockCustomRepository = () => ({
    createBoard: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn()
})

// MockRepository 타입 정의
    // Partial: 타입 T의 모든 요소를 optional하게 함
    // Record: 타입 T의 모든 K의 집합으로 타입을 만들어줌
    // keyof Repository<T>: Repository의 모든 method key를 불러옴
    // jest.Mock: key를 다 가짜로 만들어줌
    // type MockRepository<T=any>: 이를 type으로 정의해줌
// type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
type MockCustomRepository = Partial<Record<keyof BoardRepository, jest.Mock>>

describe('BoardService',  () => {
    // 사용할 클래스 선언
    let service: BoardsService
    let customBoardRepository: MockCustomRepository;
    // let boardRepository: MockRepository<BoardRepository>

    // 테스트 실행 전 의존성 주입
    beforeEach(async () => {
        // 사용할 모듈 정의
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardsService,
                {
                    provide: BoardRepository,
                    useValue: mockCustomRepository()
                },
                // {
                //     provide: getRepositoryToken(BoardRepository),
                //     useValue: mockRepository()
                // }
            ]
        }).compile()

        // 선언한 클래스에 모듈 주입
        service = module.get<BoardsService>(BoardsService)
        customBoardRepository = module.get(BoardRepository)
        // boardRepository = module.get<MockRepository<BoardRepository>>(getRepositoryToken(BoardRepository))
    })

    it ('게시글 등록 성공', async () => {
        // Given
        const createDto = {
            title: '제목',
            description: '내용',
        }

        const user = {
            id: 1,
            name: 'test'
        }

        const newBoard = {
            id: 1,
            title: createDto.title,
            description: createDto.description,
            status: 'PUBLIC',
            user: user
        }

        // 가짜 데이터 주입
        customBoardRepository.createBoard.mockResolvedValue(newBoard)
        // customBoardRepository.createBoard.mockResolvedValue(
        //     { title: createDto.title, description: createDto.description, user: user}
        // )

        // customBoardRepository.create.mockResolvedValue(newBoard)
        // customBoardRepository.save.mockResolvedValue(newBoard)

        // when
        const result = await service.createBoard(createDto, user)

        // then
        expect(result).toEqual(newBoard);
    })
})
