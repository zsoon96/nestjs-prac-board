import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BoardStatus} from "./board-status.enum";

// 엔티티 생성
@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;
}