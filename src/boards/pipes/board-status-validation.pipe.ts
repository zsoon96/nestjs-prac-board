import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

// 게시글 공개 여부에 대한 상태를 PUBLIC과 PRIVATE만 올 수 있도록 유효성 검증을 해주는 커스텀 파이프
export class BoardStatusValidationPipe implements PipeTransform {

    // 상태 값 옵션
    // readonly: 읽기 전용 속성으로, 클래스 외부에서 엑세스할 수 있지만, 해당 값은 변경할 수 없음
    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]

    // transform( 처리가 된 인자의 값(입력 값), 인자에 대한 메타데이터 )
    transform(value: any, metadata: ArgumentMetadata) {
        // 입력값 대문자로 변환
        value = value.toUpperCase();

        if ( !this.isStatusValid(value) ) {
            throw new BadRequestException('존재하지 않는 값입니다.')
        }

        return value;
    }

    // 상태값 검증 메서드
    private isStatusValid(status:any) {
        // 입력값이 StatusOptions내에 있다면 -1이 아님 (양수)
        const index = this.StatusOptions.indexOf(status)
        return index !== -1
    }

}
