import { EventRepository } from './../events/event.repository';
import { RequestManager } from './../../common/mediators/request-manager.mediator';
import { AuthGuard } from './../../common/auth/auth.guard';
import { RequestRepository } from './request.repository';
import { Controller, Get, Put, Param, UseGuards, Inject } from '@nestjs/common';

import { RequestState } from './interfaces/requestState.enum';
import { Permissions } from '@common/auth/permissions/permissions.decorator';
import { Permission } from '@common/auth/permissions/permission.enum';
import { UserToken } from '@common/decorators/user-token.decorator';

@Controller('requests')
export class RequestsController {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly eventRepository: EventRepository,
    @Inject('REQUEST_MANAGER') private readonly requestManager: RequestManager,
  ) {}

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
    const requests = await this.requestRepository.find({
      where: { planner: { username: userToken.username } },
      relations: ['event', 'event.creator'],
    });
    return requests;
  }

  @Put('/:id/accept')
  @UseGuards(AuthGuard)
  @Permissions(Permission.ManageRequest)
  async acceptRequest(@Param('id') requestId: string, @UserToken() userToken: any) {
    // TODO: Allow the same user to access his request
    const request = await this.requestRepository.findOne({
      where: { id: +requestId },
      relations: ['planner', 'event'],
    });
    request.state = RequestState.Accepted;

    await this.requestRepository.save(request);

    request.event.planner = request.planner;
    await this.eventRepository.save(request.event);

    this.requestManager.notify('ACCEPTED_REQUEST', request);
  }

  @Put('/:id/reject')
  @UseGuards(AuthGuard)
  @Permissions(Permission.ManageRequest)
  async rejectRequest(@Param('id') requestId: string) {
    // TODO: Allow the same user to access his request

    const request = await this.requestRepository.findOne({
      where: { id: +requestId },
      relations: ['event'],
    });
    request.state = RequestState.Rejected;

    await this.requestRepository.save(request);
    this.requestManager.notify('REJECTED_REQUEST', request.event);
  }
}
