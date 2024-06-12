import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Ip = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest(); // Request 객체 가져오기
        return request.ip;
    },
);
