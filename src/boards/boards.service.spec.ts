import {Test, TestingModule} from "@nestjs/testing";
import {BoardsService} from "./boards.service";
import {BoardRepository} from "./board.repository";
import {plainToInstance} from "class-transformer";
import {CreateBoardDto} from "./dto/create-board.dto";
import {validate} from "class-validator";
import {stringify} from "ts-jest";

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
    getAllBoard: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn()
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

    describe('createBoard', () => {
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

        it ('게시글 등록 성공', async () => {
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

        it ('게시글 등록 실패', async () => {
            customBoardRepository.createBoard.mockResolvedValue(newBoard)
            customBoardRepository.create.mockRejectedValue(newBoard)
            customBoardRepository.save.mockRejectedValue(newBoard)

            try {
                const result = await service.createBoard(createDto, user)
                expect(result).toBeDefined()
            } catch (err) {
                expect(err.status).toBe(400)
                expect(err.response.message).toBe('입력값을 확인해주세요.')
            }
        })
    });

    // controller에 적용 후 테스트 확인
    it('title 유효성 검사', async () => {
        // given
        const createDto = {
            title: undefined,
            description: '내용',
        }

        // Dto 객체로 변환
        const transformDto = plainToInstance(CreateBoardDto, createDto)

        // const user = {
        //     id: 1,
        //     name: 'test'
        // }

        // when
        const errors = await validate(transformDto)
        // await service.createBoard(createDto, user)

        // then
        expect(errors.length).not.toBe(0)
        expect(stringify(errors)).toContain('title should not be empty')
    })


    describe('getAllBoard', () => {
        const boardList = [
            {
                id: 1,
                title: '제목1',
                description: '내용1'
            }
        ]
        it('게시글 전체조회 성공', async () => {
            // given
            customBoardRepository.getAllBoard.mockResolvedValue(boardList)

            // when
            const result = await service.getAllBoard()

            // then
            expect(customBoardRepository.getAllBoard).toBeCalledTimes(1)
            expect(result).toEqual(boardList)
        })

        it('존재하는 게시글이 없을 경우', async () => {
            // given
            customBoardRepository.getAllBoard.mockResolvedValue([])
            customBoardRepository.find.mockRejectedValue([])

            // when
            try {
                const result = await service.getAllBoard()
                expect(result).toBeDefined()
            } catch(err) {
                expect(err.status).toBe(404)
                expect(err.response.message).toBe('존재하는 게시글이 없습니다.')
            }
        })
    })

    describe('getBoardById', () => {
        const boardId = 1

        const mockBoard = {
            id: 1,
            title: '제목',
            description: '내용',
            user: {
                id: 1,
                name: '이름'
            }
        }

        it('게시글 상세조회 성공', async () => {
            customBoardRepository.findOneBy.mockResolvedValue(mockBoard)

            const result = await service.getBoardById(boardId)

            expect(customBoardRepository.findOneBy).toBeCalledTimes(1)
            expect(result).toEqual(mockBoard)
        })

        it('게시글 상세조회 실패', async () => {
            customBoardRepository.findOneBy.mockResolvedValue(undefined)

            try {
                const result = await service.getBoardById(boardId)
                expect(result).toBeDefined()
            } catch (err) {
                expect(err.status).toBe(404)
                expect(err.response.message).toBe('해당 게시글이 존재하지 않습니다.')
            }
        })
    })
})
