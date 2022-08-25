import { Injectable, NotFoundException } from '@nestjs/common';
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
    // Repository 주입
    constructor(private boardRepository: BoardRepository) {}

    // 게시글 전체 조회 처리 로직
    async getAllBoard() : Promise<Board[]> {
        return await this.boardRepository.find();
    }

    // 게시글 생성 처리 로직
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

    // 게시글 공개여부 상태 수정 처리 로직
    async updateBoardStatus(id:number, status:BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    // 게시글 내용 수정 처리 로직
    async updateBoardContent(id: number, title:string, description:string) : Promise<Board> {
        const board = await this.boardRepository.findOneBy({id});

        board.title = title;
        board.description = description;

        await this.boardRepository.save(board);

        return board;
    }

    // 게시글 삭제 처리 로직
    async deleteBoard(id: number) : Promise<void> {
        await this.boardRepository.delete(id);
    }
}
