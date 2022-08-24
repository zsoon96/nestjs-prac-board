import {Controller, Get} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {Board} from "./board.entity";

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // 게시물 전체 조회
    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoard();
    }
}
