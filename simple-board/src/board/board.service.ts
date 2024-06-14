import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Board } from 'src/entities/board.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
    ) {}

    // 게시판 목업데이터
    private boards = [
        {
            id: 1,
            title: 'hello world',
            content: 'Content 1',
        },
        {
            id: 2,
            title: 'hello world',
            content: 'Content 2',
        },
        {
            id: 3,
            title: 'hello world',
            content: 'Content 3',
        },
        {
            id: 4,
            title: 'hello world',
            content: 'Content 4',
        },
        {
            id: 5,
            title: 'hello world',
            content: 'Content 5',
        },
    ];

    async findAll() {
        return await this.boardRepository.find();
    }

    async find(id: number) {
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: { user: true },
        });

        if (!board) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        return board;
    }

    async create(data: CreateBoardDto) {
        return await this.boardRepository.save(data);
    }

    async update(id: number, data: UpdateBoardDto) {
        console.log(id);
        const board = await this.boardRepository.findOneBy({
            id,
        });

        console.log(board);

        if (!board) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        return await this.boardRepository.update(id, {
            ...data,
        });
    }

    async delete(id: number) {
        return await this.boardRepository.delete(id);
    }
}
