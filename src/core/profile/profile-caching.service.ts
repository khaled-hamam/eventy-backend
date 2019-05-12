import { Injectable, Inject } from '@nestjs/common';

import { RedisService } from '@db/redis/redis.service';
import { UserRepository } from '@core/users/user.repository';
import { UserRole } from '@core/users/user-roles.type';
import { User } from '@core/users/user.model';
import { EventPlanner } from './../users/planner.model';
import { PlannerRepository } from './../users/planner.repository';

@Injectable()
export class ProfileCachingService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly plannerRepository: PlannerRepository,
    @Inject('REDIS_CLIENT') private readonly redisService: RedisService,
  ) {}

  public async findByUsername(role: UserRole, username: string): Promise<User | EventPlanner> {
    const cachedProfile = (await this.redisService.client.get(`profile:${username}`)) as any;
    if (cachedProfile) {
      return JSON.parse(cachedProfile);
    }

    let user;
    if (role === 'planner') {
      user = await this.plannerRepository.findOne({
        where: { user: { username } },
        relations: ['user', 'events'],
      });
    } else if (role === 'creator') {
      user = await this.userRepository.findOne({ where: { username }, relations: ['events'] });
    }

    await this.redisService.client.set(
      `profile:${username}`,
      JSON.stringify(user),
      'EX',
      this.redisService.defaults.duration,
    );
    return user;
  }
}
