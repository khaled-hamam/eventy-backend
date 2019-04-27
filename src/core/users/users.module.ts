import { HashingService } from './../../common/services/hashing.service';
import { AppModule } from './../app.module';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UserRepository, HashingService],
})
export class UsersModule { }
