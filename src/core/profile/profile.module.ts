import { ProfileController } from './profile.controller';
import { Module } from '@nestjs/common';
import { PlannerRepository } from './../users/planner.repository';
import { UserRepository } from './../users/user.repository';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [ProfileController],
  providers: [UserRepository, PlannerRepository],
})
export class ProfileModule {}
