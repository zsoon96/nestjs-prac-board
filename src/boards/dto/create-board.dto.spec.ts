import {plainToInstance} from "class-transformer";
import { CreateBoardDto } from "./create-board.dto";
import {validate, ValidationError} from "class-validator";

// validation error 객체를 json으로 변환하는 함수
export function stringified(errors: ValidationError[]): string {
    return JSON.stringify(errors)
}

describe('createBoardDto', () => {
    it('유효성 검사 테스트', async () => {
        // 유효성 검사할 테스트 객체
        const createDto = {
            title: null,
            description: null
        }

        // plainToInstance(): 테스트 객체를 DTO 유형으로 변환
        const validateCreateDto = plainToInstance(CreateBoardDto, createDto)

        // 유효성 검사
        const errors = await validate(validateCreateDto)

        // 결과
        expect(errors.length).toBe(2)
        expect(stringified(errors)).toContain('title should not be empty')
        expect(stringified(errors)).toContain('description should not be empty')
    })
})