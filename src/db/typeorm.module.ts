import { DynamicModule, Provider } from "@nestjs/common";
import { getDataSourceToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import {TYPEORM_CUSTOM_REPOSITORY} from "./typeorm.decorator";

// @CustomRepository가 적용된 Repository를 받아줄 모듈
export class CustomTypeOrmModule {
    public static forCustomRepository<T extends new (...args: any[]) => any>(repositories: T[]): DynamicModule {
        const providers: Provider[] = [];

        for (const repository of repositories) {
            // TYPEORM_CUSTOM_REPOSITORY에 해당되는 엔티티 가져옴
            const entity = Reflect.getMetadata(TYPEORM_CUSTOM_REPOSITORY, repository);

            if (!entity) {
                continue;
            }

            // 메타데이터(TYPEORM_CUSTOM_REPOSITORY) 키캆에 해당하는 엔티티가 존재하는 경우
            // Factory를 이용하여 provider를 동적으로 생성하여 providers에 추가
            providers.push({
                inject: [getDataSourceToken()],
                provide: repository,
                useFactory: (dataSource: DataSource): typeof repository => {
                    const baseRepository = dataSource.getRepository<any>(entity);
                    return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
                },
            });
        }

        return {
            exports: providers,
            module: CustomTypeOrmModule,
            providers,
        };
    }
}