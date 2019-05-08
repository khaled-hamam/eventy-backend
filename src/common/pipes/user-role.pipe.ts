import { PlannerRepository } from '@core/users/planner.repository';
import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@core/users/user.repository';
import { UserRole } from '@core/users/user-roles.type';

@Injectable()
export class UserRolePipe implements PipeTransform {
  constructor(private _userRepository: UserRepository, private _plannerRepository: PlannerRepository) {}

  async transform(username: string, metadata: ArgumentMetadata): Promise<UserRole> {
    const planner = await this._plannerRepository.findOne({
      where: { user: { username } },
      relations: ['user'],
    });
    const user = await this._userRepository.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return planner ? 'planner' : 'creator';
  }
}
