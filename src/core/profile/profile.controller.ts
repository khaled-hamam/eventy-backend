import {
  Controller,
  Body,
  Get,
  Put,
  Param,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  Post,
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
import { RatePlannerDTO } from './dto/ratePlanner.dto';
import { ProfileCachingService } from './profile-caching.service';

@Controller('/profiles')
export class ProfileController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly plannerRepository: PlannerRepository,
    private readonly cachingService: ProfileCachingService,
  ) {}

  @Get('/:username')
  async getProfile(@Param('username') username: string, @Param('username', UserRolePipe) role: UserRole) {
    const user = await this.cachingService.findByUsername(role, username);

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
    let user = await this.userRepository.findOne({
      where: { username: userToken.username },
      relations: ['events'],
    });
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

  @Post('/rate/:username')
  async updateRate(@Param('username') username, @Body() RatePlannerDTO: RatePlannerDTO) {
    const planner = await this.plannerRepository.findOne({ username });
    planner.rating =
      (planner.ratingCount * planner.rating + RatePlannerDTO.newRate) / (planner.ratingCount + 1);
    planner.ratingCount += 1;
    await this.plannerRepository.save(planner);
  }
}
