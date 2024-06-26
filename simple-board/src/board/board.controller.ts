import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';

@Controller('board')
@ApiTags('Board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Get()
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':id')
    find(@Param('id', ParseIntPipe) id: number) {
        return this.boardService.find(id);
    }

    @Post()
    create(@Body(new ValidationPipe()) data: CreateBoardDto) {
        return this.boardService.create(data);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe()) data: UpdateBoardDto,
    ) {
        return this.boardService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.boardService.delete(id);
    }
}
