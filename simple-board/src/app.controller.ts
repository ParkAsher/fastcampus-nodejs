import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    private readonly logger = new Logger(AppController.name);

    @Get()
    getHello(@Ip() ip: string): string {
        // this.logger.log(ip);
        // this.logger.debug(ip);
        // this.logger.error(ip);

        // console.log(ip);
        return this.appService.getHello();
        // throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
}
