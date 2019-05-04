import { Request } from './request.model';
import { RequestRepository } from './request.repository';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { response } from 'express';
import { RequestState } from './interfaces/requestState';

@Controller('requests')
export class RequestsController {
    constructor(private readonly requestRepository: RequestRepository) { }

    @Get('/:id')
    async getRequest(@Param('id') requestId: String) {
        const request = await this.requestRepository.findOne({ id: +requestId });
        return request;
    }
    @Get('/:id/accept')
    async getAcceptedRequest(@Param('id') requestId: String) {
        const request = await this.requestRepository.findOne({ id: +requestId });
        request.state = RequestState.Accepted;

        await this.requestRepository.save(request);
        response.status(201);
    }
    @Get('/:id/reject')
    async getRejectedRequest(@Param('id') requestId: String) {
        const request = await this.requestRepository.findOne({ id: +requestId });
        request.state = RequestState.Rejected;

        await this.requestRepository.save(request);
        response.status(201);
    }
}