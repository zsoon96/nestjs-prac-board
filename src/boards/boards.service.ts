import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
    // Repository 주입
    constructor(private boardRepository: BoardRepository) {}

    // 게시글 전체 조회 처리 로직
    async getAllBoard() : Promise<Board[]> {
        return await this.boardRepository.find();
    }

    // 게시글 생성
    async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    // 게시글 단일 조회 처리 로직
    async getBoardById(id:number) : Promise<Board> {
        const board = await this.boardRepository.findOneBy({id});

        if ( !board ) {
            throw new NotFoundException('해당 게시글이 존재하지 않습니다.');
        }

        return board;
    }
}
