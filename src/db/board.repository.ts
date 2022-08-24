import {Board} from "../boards/board.entity";
import {Repository} from "typeorm";
import {CustomRepository} from "./typeorm.decorator";

// db 관련 로직 처리를 위한 레포지토리
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

}