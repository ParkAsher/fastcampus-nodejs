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

    async findAll() {
        return await this.boardRepository.find();
    }

    async find(id: number) {
        const board = await this.getBoardById(id);

        if (!board) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        return board;
    }

    async create(data: CreateBoardDto) {
        return await this.boardRepository.save(data);
    }

    async update(id: number, data: UpdateBoardDto) {
        const board = await this.getBoardById(id);

        if (!board) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        return await this.boardRepository.update(id, {
            ...data,
        });
    }

    async delete(id: number) {
        const board = await this.getBoardById(id);

        if (!board) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        return await this.boardRepository.remove(board);
    }

    async getBoardById(id: number) {
        return await this.boardRepository.findOneBy({
            id,
        });
    }
}
