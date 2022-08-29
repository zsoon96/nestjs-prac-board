import {IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class LoginReqDto {
    // @ts-ignore
    @IsEmail
    email:string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/,
        {message : '비밀번호는 영어와 숫자로만 입력해주세요.'})
    password: string
}