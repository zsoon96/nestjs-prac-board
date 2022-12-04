import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BoardStatus} from "./board-status.enum";
import {User} from "../user/user.entity";

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

    @ManyToOne( type => User, user => user.boards, {eager: false})
    user: User;
}