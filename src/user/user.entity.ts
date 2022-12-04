import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Board} from "../boards/board.entity";

@Entity()
@Unique(['email','username']) // 이메일, 유저이름에 대한 중복 체크
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    username: string

    @Column()
    password: string

    // eager: true > user 정보를 조회할 때, boards의 정보도 함께 불러옴
    @OneToMany( type => Board, board => board.user, {eager:true})
    boards: Board[]
}