import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PlannerRepository } from './planner.repository';
import { AppModule } from '@core/app.module';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [UsersController],
  providers: [UserRepository, PlannerRepository],
})
export class UsersModule {}
