import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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
}
