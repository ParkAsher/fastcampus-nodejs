import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities/board.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dtos/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUsers() {
        // return this.userRepository.find({
        //     relations: {
        //         boards: true,
        //     },
        //     select: {
        //         boards: {
        //             id: true,
        //         },
        //     },
        // });

        // QueryBuilder
        const qb = this.userRepository.createQueryBuilder();

        qb.addSelect((subQuery) => {
            return subQuery
                .select('count(id)')
                .from(Board, 'Board')
                .where('Board.userId = User.id');
        }, 'User_boardCount');

        return qb.getMany();
    }

    async createUser(data: CreateUserDto) {
        const { username, name, password } = data;

        const encryptedPassword = await this.encryptPassword(password);

        return this.userRepository.save({
            username,
            name,
            password: encryptedPassword,
        });
    }

    async encryptPassword(password: string) {
        const SALT = 11;
        return hash(password, SALT);
    }

    async getUserByUsername(username: string) {
        return this.userRepository.findOneBy({
            username,
        });
    }

    async login(data: LoginUserDto) {
        // 유저 존재 확인
        const { username, password } = data;

        const user = await this.userRepository.findOneBy({
            username,
        });

        if (!user) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        const match = await compare(password, user.password);

        if (!match)
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

        const payload = {
            username,
            name: user.name,
        };

        const accessToken = jwt.sign(payload, 'secret-key', {
            expiresIn: '1d',
        });

        return { accessToken };
    }
}
