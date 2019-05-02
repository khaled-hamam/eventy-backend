import { Controller, Body, Get, Put, Param } from '@nestjs/common';

import { EditUserProfileDTO } from './dto/editUserProfile.dto';
import { UserProfileDTO } from './dto/userProfile.dto';
import { PlannerRepository } from '@core/users/planner.repository';
import { UserRepository } from '@core/users/user.repository';
import { copyObject } from '@utils/copyObject';
import { User } from '@core/users/user.model';
import { response } from 'express';
import bodyParser = require('body-parser');

@Controller('/profiles')
export class ProfileController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly plannerRepository: PlannerRepository,
  ) {}

  @Get('/:username')
  async getProfile(@Param('username') username: string) {
    const user = await this.userRepository.findOne({ username });

    return copyObject(UserProfileDTO, user);
  }

  @Put('/:username')
  async editProfile(@Param('username') username: string, @Body() editUserProfileDTO: EditUserProfileDTO) {
    let user = await this.userRepository.findOne({ username });
    user = {
      ...user,
      ...editUserProfileDTO,
    };
    await this.userRepository.save(user);

    response.status(200);
    return copyObject(UserProfileDTO, user);
  }
}
