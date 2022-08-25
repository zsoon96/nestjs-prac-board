import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatus} from "./board-status.enum";

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

    // 게시글 공개여부 상태 수정
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: number,
        @Body('status') status: BoardStatus
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }

    // 게시글 내용 수정
    @Put('/:id/content')
    updateBoardContent(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('description') description: string) : Promise<Board> {
        return this.boardsService.updateBoardContent(id, title, description);
    }

    // 게시글 삭제
    @Delete('/:id')
    deleteBoard(@Param('id') id: number) : Promise<void> {
        return this.boardsService.deleteBoard(id);
    }
}
