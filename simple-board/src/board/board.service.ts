import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
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

    findAll() {
        return this.boards;
    }

    find(id: number) {
        const index = this.getBoardId(id);

        return this.boards[index];
    }

    create(data) {
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

    update(id: number, data) {
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
