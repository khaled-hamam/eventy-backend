import { AuthGuard } from './../../common/auth/auth.guard';
import { Request } from './request.model';
import { RequestRepository } from './request.repository';
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { response } from 'express';
import { RequestState } from './interfaces/requestState.enum';
import { Permissions } from '@common/auth/permissions/permissions.decorator';
import { Permission } from '@common/auth/permissions/permission.enum';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestRepository: RequestRepository) {}

  @Get('/:id')
  async getRequest(@Param('id') requestId: string) {
    const request = await this.requestRepository.findOne({ id: +requestId });
    return request;
  }

  @Get('/:id/accept')
  @UseGuards(AuthGuard)
  @Permissions(Permission.ManageRequest)
  async getAcceptedRequest(@Param('id') requestId: string) {
    const request = await this.requestRepository.findOne({ id: +requestId });
    request.state = RequestState.Accepted;

    await this.requestRepository.save(request);
    response.status(201);
  }

  @Get('/:id/reject')
  @UseGuards(AuthGuard)
  @Permissions(Permission.ManageRequest)
  async getRejectedRequest(@Param('id') requestId: string) {
    const request = await this.requestRepository.findOne({ id: +requestId });
    request.state = RequestState.Rejected;

    await this.requestRepository.save(request);
    response.status(201);
  }
}
