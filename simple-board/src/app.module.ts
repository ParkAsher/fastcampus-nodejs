import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import configModule from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        configModule(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST,
            port: parseInt(process.env.PG_PORT),
            username: 'root',
            password: 'root',
            database: 'postgres',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: true,
        }),
        BoardModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}
