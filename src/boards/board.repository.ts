import {Board} from "./board.entity";
import {Repository} from "typeorm";
import {CustomRepository} from "../db/typeorm.decorator";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatus} from "./board-status.enum";
import { BadRequestException } from "@nestjs/common";

// db 관련 로직 처리를 위한 레포지토리
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> { {
        const { title, description } = createBoardDto;

        try {
            const board = this.create({
                title,
                description,
                status: BoardStatus.PUBLIC,
                user
            })

            await this.save(board);
            return board;
        }
        catch (err) {
            throw new BadRequestException('입력값을 확인해주세요.')
        }

    }}
}