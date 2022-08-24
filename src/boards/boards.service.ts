import { Injectable } from '@nestjs/common';
import {BoardRepository} from "../db/board.repository";
import {Board} from "./board.entity";

@Injectable()
export class BoardsService {
    // Repository 주입
    constructor(private boardRepository: BoardRepository) {}

    // 게시물 전체 조회 처리 로직
    async getAllBoard() : Promise<Board[]> {
        return await this.boardRepository.find();
    }
}
