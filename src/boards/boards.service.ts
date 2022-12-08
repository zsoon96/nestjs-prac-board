import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
    // Repository 주입
    constructor(private boardRepository: BoardRepository) {}

    // 게시글 전체 조회 처리 로직
    async getAllBoard() {
        return await this.boardRepository.getAllBoard();
    }

    // 게시글 생성 처리 로직
    async createBoard(createBoardDto: CreateBoardDto, user: User) : Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    // 게시글 단일 조회 처리 로직
    async getBoardById(id:number) : Promise<Board> {
        const board = await this.boardRepository.findOneBy({id});

        if ( !board ) {
            throw new NotFoundException('해당 게시글이 존재하지 않습니다.');
        }

        return board;
    }

    // 본인이 작성한 게시글만 조회하는 처리 로직 (404)
    async getBoardByUser(user: User) : Promise<Board[]> {
        // 복잡한 쿼리가 필요한 경우, QueryBuilder를 통해 해결
        const query = this.boardRepository.createQueryBuilder('board')
        // board의 userId가 파라미터로 받은 user.id와 같은 것만 찾는 쿼리
        query.where ('board.userId = :userId', {userId: user.id})
        // 찾은 값 boards에 담아줘서 리턴
        const boards = await query.getMany()
        return boards
    }

    // 게시글 공개여부 상태 수정 처리 로직
    // async updateBoardStatus(id:number, status:BoardStatus): Promise<Board> {
    //     const board = await this.getBoardById(id);
    //
    //     board.status = status;
    //     await this.boardRepository.save(board);
    //
    //     return board;
    // }

    // 게시글 내용 수정 처리 로직
    async updateBoardContent(id: number, title:string, description:string, status: BoardStatus) : Promise<Board> {
        const board = await this.boardRepository.findOneBy({id});

        if (!board) {
            throw new NotFoundException('해당 게시글이 존재하지 않습니다.')
        }

        board.title = title;
        board.description = description;
        board.status = status;

        try {
            await this.boardRepository.save(board);
        } catch (err) {
            throw new InternalServerErrorException('게시글 저장에 실패하였습니다.')
        }

        return board;
    }

    // 게시글 삭제 처리 로직 (작성자만)
    async deleteBoard(id: number, user:User) : Promise<void> {
        // await this.boardRepository.delete(id);
        const result = await this.boardRepository.delete({id, user});

        // 게시글 유무 검증
        if (result.affected === 0) {
            throw new NotFoundException('작성자만 삭제 가능합니다.');
        }
    }
}
