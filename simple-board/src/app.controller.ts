import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {}

    private readonly logger = new Logger(AppController.name);

    @Get()
    getHello(@Ip() ip: string): string {
        // this.logger.log(ip);
        // this.logger.debug(ip);
        // this.logger.error(ip);

        console.log(this.configService.get<string>('ENVIRONMENT'));

        // console.log(ip);
        return this.appService.getHello();
        // throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Request() req) {
        return req.user;
    }
}
