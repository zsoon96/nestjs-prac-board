import { Module } from '@nestjs/common';
import { BoardRepository } from 'src/boards/board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import {CustomTypeOrmModule} from "../db/typeorm.module";
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([BoardRepository]), UserModule],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
