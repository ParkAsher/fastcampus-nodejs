import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const request = ctx.getRequest<Request>();
        const error = exception.getResponse();

        response.status(status).json({
            statusCode: status,
            error,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
