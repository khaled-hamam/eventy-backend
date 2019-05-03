import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PlannerRepository } from './planner.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserRepository, PlannerRepository],
})
export class UsersModule {}
