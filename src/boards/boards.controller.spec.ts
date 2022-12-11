import {BoardsController} from "./boards.controller";
import { BoardsService } from "./boards.service";
import {Test, TestingModule} from "@nestjs/testing";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {BoardStatus} from "./board-status.enum";
import {BoardRepository} from "./board.repository";
import {BadRequestException, NotFoundException} from "@nestjs/common";

const mockService = () => ({
    getAllBoard: jest.fn(),
    createBoard: jest.fn(),
    getBoardById: jest.fn(),
    updateBoardContent: jest.fn(),
    deleteBoard: jest.fn()
})

const mockCustomRepository = () => ({
    getAllBoard: jest.fn(),
})

type MockService<T=any> = Partial<Record<keyof T, jest.Mock>>
type MockCustomRepository = Partial<Record<keyof BoardRepository, jest.Mock>>

describe('BoardsController', () => {
    let controller:BoardsController
    let service:MockService<BoardsService>
    let repository:MockCustomRepository

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ PassportModule.register({defaultStrategy:'jwt'}),
                JwtModule.register({
                    secret: 'secret',
                    signOptions: {
                        expiresIn: 3600
                    }
                })],
            controllers: [BoardsController],
            providers: [
                BoardsService,
                {
                    provide: BoardsService,
                    useValue: mockService()
                },
                {
                    provide: BoardRepository,
                    useValue: mockCustomRepository()
                },
            ]
        }).compile()

        controller = module.get(BoardsController)
        service = module.get(BoardsService)
        repository = module.get(BoardRepository)
    })

    describe('POST - createBoard', () => {
        it('게시글 등록 통신 성공', async () => {
            const createBoardDto = {
                title: '제목',
                description: '내용'
            }

            const mockUser = {
                id: 1,
                name: 'user'
            }

            const mockBoard = {
                id: 1,
                title: createBoardDto.title,
                description: createBoardDto.description,
                status: BoardStatus.PUBLIC,
                user: mockUser
            }

            service.createBoard.mockResolvedValue(mockBoard)

            const result = await controller.createBoard(createBoardDto, mockUser)

            expect(result).toBeDefined()
            expect(result).toEqual(mockBoard)
            expect(service.createBoard).toBeCalled()
        })
    })

    describe('GET - getAllBoard', () => {
        it('게시글 목록조회 통신 - 정상 조회', async () => {
            const mockBoardList = [
                {
                    id: 1,
                    title: '제목1',
                    description: '내용1',
                    status: BoardStatus.PUBLIC,
                    user: {
                        id: 1,
                        name: 'user1'
                    }
                },
                {
                    id: 2,
                    title: '제목2',
                    description: '내용2',
                    status: BoardStatus.PUBLIC,
                    user: {
                        id: 2,
                        name: 'user2'
                    }
                },
            ]
            service.getAllBoard.mockResolvedValue(mockBoardList)

            const result = await controller.getAllBoard()

            expect(result).toBeDefined()
            expect(result).toEqual(mockBoardList)
            expect(service.getAllBoard).toBeCalled()
        })

        it('게시글 목록조회 통신 - 조회 실패', async () => {
            service.getAllBoard.mockRejectedValue(new NotFoundException())

            try {
                const result = await controller.getAllBoard()
                expect(result).toBeDefined()
            } catch (err) {
                expect(err).toBeInstanceOf(NotFoundException)
            }
        })
    })

    describe('GET - getBoardById',   () => {
        const mockBoard = {
            id: 1,
            title: '제목1',
            description: '내용1',
            status: BoardStatus.PUBLIC,
            user: {
                id: 1,
                name: 'user1'
            }
        }
        it ('게시글 상세조회 통신 - 정상 조회', async () => {
            service.getBoardById.mockResolvedValue(mockBoard)

            const result = await controller.getBoardById(mockBoard.id)

            expect(result).toBeDefined()
            expect(result).toStrictEqual(mockBoard)
            expect(service.getBoardById).toBeCalled()
        })

        it ('게시글 상세조회 통신 - 조회 실패', async () => {
            service.getBoardById.mockRejectedValue(new NotFoundException())

            try {
                const result = await controller.getBoardById(mockBoard.id)
                expect(result).toBeDefined()
            } catch (err) {
                expect(err).toBeInstanceOf(NotFoundException)
            }
        })
    });
})