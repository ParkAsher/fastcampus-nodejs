import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto {
    contents: string;
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) {};
