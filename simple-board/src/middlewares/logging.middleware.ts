import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class LoggingMiddleware implements NestMiddleware {
    private readonly logger = new Logger();

    use(req: Request, res: Response, next: NextFunction) {
        // API가 종료되는 시점에 API가 어떤 것이 호출되었는지, 메서드, 주소, 응답 상태값, 소요된 시간 출력

        const { method, originalUrl } = req;
        const startTime = Date.now();

        // 종료되는 시점
        res.on('finish', () => {
            const { statusCode } = res;
            const responseTime = Date.now() - startTime;

            this.logger.log(
                `${method} ${originalUrl}:${statusCode} - ${responseTime}ms`,
            );
        });

        next();
    }
}
