import {BoardsController} from "./boards.controller";
import { BoardsService } from "./boards.service";
import {Test, TestingModule} from "@nestjs/testing";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {BoardStatus} from "./board-status.enum";

const mockService = () => ({
    getAllBoard: jest.fn(),
    createBoard: jest.fn(),
    getBoardById: jest.fn(),
    updateBoardContent: jest.fn(),
    deleteBoard: jest.fn()
})

type MockService<T=any> = Partial<Record<keyof T, jest.Mock>>

describe('BoardsController', () => {
    let controller:BoardsController
    let service:MockService<BoardsService>

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
            ]
        }).compile()

        controller = module.get(BoardsController)
        service = module.get(BoardsService)
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
})