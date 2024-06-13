import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Board {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ApiProperty({ description: '유저번호' })
    @Column()
    userId: number;

    @ApiProperty({ description: '내용' })
    @Column()
    contents: string;

    @ApiProperty({ description: '수정일' })
    @UpdateDateColumn()
    updateAt: Date;

    @ApiProperty({ description: '생성일' })
    @UpdateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: '유저정보' })
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
