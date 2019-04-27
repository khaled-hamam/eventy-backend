import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UserRepository],
})
export class UsersModule {}
