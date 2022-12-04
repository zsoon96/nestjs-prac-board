import {SetMetadata} from "@nestjs/common";

// TypeORM 0.3.x 부터 @EntityRepository가 deprecated 되어 @CustomRepository라는 데코레이션을 생성 후,
// 데코레이터가 적용된 Repository 모듈 사용하는 방식 적용

// @CustomRepository 데코레이터 생성
export const TYPEORM_CUSTOM_REPOSITORY = "TYPEORM_CUSTOM_REPOSITORY";

export function CustomRepository(entity: Function):ClassDecorator {
    // SetMetadata()를 이용하여 전달받은 Entity를 TYPEORM_CUSTOM_REPOSITORY 메타데이터에 지정
    return SetMetadata(TYPEORM_CUSTOM_REPOSITORY, entity);
}