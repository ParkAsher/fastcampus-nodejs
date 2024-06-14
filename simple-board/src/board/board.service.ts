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

        if (!board) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);

        return board;
    }

    create(data: CreateBoardDto) {
        const nextId = this.getNextId();
        const newBoard = { id: nextId, ...data };

        this.boards.push(newBoard);
        return newBoard;
    }

    getNextId() {
        return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
    }

    getBoardId(id: number) {
        return this.boards.findIndex((board) => board.id === id);
    }

    update(id: number, data: UpdateBoardDto) {
        const index = this.getBoardId(id);

        if (index > -1) {
            this.boards[index] = {
                ...this.boards[index],
                ...data,
            };
            return this.boards[index];
        }

        return null;
    }

    delete(id: number) {
        const index = this.getBoardId(id);

        if (index > -1) {
            const deleteBoard = this.boards[index];
            this.boards.splice(index, 1);

            return deleteBoard;
        }
        return null;
    }
}
