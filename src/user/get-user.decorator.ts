import {createParamDecorator, ExecutionContext} from "@nestjs/common";

// 요청시, request 객체 안에 User 객체가 담긴 req.user를 대신하는 데코레이터
// @UseGuard(AuthGuard())를 함께 사용해야 request 객체 안에 User 객체가 담김
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) : User=> {
    const req = ctx.switchToHttp().getRequest()
    return req.user
})