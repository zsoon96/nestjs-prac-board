import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // 게시글 전체 조회
    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoard();
    }

    // 게시글 생성
    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    // 게시글 단일 조회
    @Get('/:id')
    getBoardById(@Param('id')id:number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

}
