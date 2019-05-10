import {
  Controller,
  Body,
  Get,
  Put,
  Param,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { AuthGuard } from './../../common/auth/auth.guard';
import { EditUserProfileDTO } from './dto/editUserProfile.dto';
import { UserProfileDTO } from './dto/userProfile.dto';
import { PlannerRepository } from '@core/users/planner.repository';
import { UserRepository } from '@core/users/user.repository';
import { copyObject } from '@utils/copyObject';
import { Permissions } from '@common/auth/permissions/permissions.decorator';
import { Permission } from '@common/auth/permissions/permission.enum';
import { UserRolePipe } from '@common/pipes/user-role.pipe';
import { UserRole } from '@core/users/user-roles.type';
import { PlannerProfileDTO } from './dto/plannerProfile.dto';
import { UserToken } from '@common/decorators/user-token.decorator';

@Controller('/profiles')
export class ProfileController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly plannerRepository: PlannerRepository,
  ) {}

  @Get('/:username')
  async getProfile(@Param('username') username: string, @Param('username', UserRolePipe) role: UserRole) {
    let user;
    if (role === 'planner') {
      user = await this.plannerRepository.findOne({
        where: { user: { username } },
        relations: ['user', 'events'],
      });
    } else if (role === 'creator') {
      user = await this.userRepository.findOne({ where: { username }, relations: ['events'] });
    }

    const ProfileDTO = role === 'planner' ? PlannerProfileDTO : UserProfileDTO;
    return copyObject(ProfileDTO, user);
  }

  @Put('/')
  @UseGuards(AuthGuard)
  @Permissions(Permission.EditProfile)
  async editProfile(
    @Body() editUserProfileDTO: EditUserProfileDTO,
    // FIXME: add typing for usertoken object
    @UserToken() userToken: any,
  ) {
    let user = await this.userRepository.findOne({ username: userToken.username });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user = {
      ...user,
      ...editUserProfileDTO,
    };
    await this.userRepository.save(user);

    return copyObject(UserProfileDTO, user);
  }
}
