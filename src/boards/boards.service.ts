import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardRepository} from "../db/board.repository";
import {Board} from "./board.entity";

@Injectable()
export class BoardsService {
    // Repository 주입
    constructor(private boardRepository: BoardRepository) {}

    // 게시글 전체 조회 처리 로직
    async getAllBoard() : Promise<Board[]> {
        return await this.boardRepository.find();
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
