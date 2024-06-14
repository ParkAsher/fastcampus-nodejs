import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities/board.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

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
}
