import { PlannerRepository } from './../users/planner.repository';
import { AuthGuard } from './../../common/auth/auth.guard';
import { Request } from './request.model';
import { RequestRepository } from './request.repository';
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { response } from 'express';
import { RequestState } from './interfaces/requestState.enum';
import { Permissions } from '@common/auth/permissions/permissions.decorator';
import { Permission } from '@common/auth/permissions/permission.enum';
import { UserToken } from '@common/decorators/user-token.decorator';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestRepository: RequestRepository) {}

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getRequest(@Param('id') requestId: string) {
    // TODO: Allow the same user to access his request
    const request = await this.requestRepository.findOne({ id: +requestId });
    return request;
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Permissions(Permission.ManageRequest)
  async getRequests(@UserToken() userToken: any) {
    const requests = await this.requestRepository.find({ planner: { username: userToken.username } });
    return requests;
  }

  @Put('/:id/accept')
  @UseGuards(AuthGuard)
  @Permissions(Permission.ManageRequest)
  async acceptRequest(@Param('id') requestId: string) {
    // TODO: Allow the same user to access his request
    const request = await this.requestRepository.findOne({
      id: +requestId,
    });
    request.state = RequestState.Accepted;

    await this.requestRepository.save(request);
  }

  @Put('/:id/reject')
  @UseGuards(AuthGuard)
  @Permissions(Permission.ManageRequest)
  async rejectRequest(@Param('id') requestId: string) {
    // TODO: Allow the same user to access his request
    const request = await this.requestRepository.findOne({
      id: +requestId,
    });
    request.state = RequestState.Rejected;

    await this.requestRepository.save(request);
  }
}
