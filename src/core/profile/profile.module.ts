import { ProfileCachingService } from './profile-caching.service';
import { ProfileController } from './profile.controller';
import { Module } from '@nestjs/common';
import { PlannerRepository } from './../users/planner.repository';
import { UserRepository } from './../users/user.repository';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [ProfileController],
  providers: [UserRepository, PlannerRepository, ProfileCachingService],
})
export class ProfileModule {}
