import { Permissions } from '@common/auth/permissions/permissions.decorator';
import { Event } from './event.model';
import { EventRepository } from './event.repository';
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { response } from 'express';
import { CreateEventDTO } from './dto/createEvent.dto';
import { UpdateEventDTO } from './dto/updateEvent.dto';
import { AuthGuard } from '@common/auth/auth.guard';
import { Permission } from '@common/auth/permissions/permission.enum';

@Controller('events')
export class EventsController {
  constructor(private readonly eventRepository: EventRepository) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @Permissions(Permission.CreateEvent)
  async createEvent(@Body() createEventDTO: CreateEventDTO) {
    const event = new Event(createEventDTO);

    await this.eventRepository.save(event);
    response.status(201);
  }

  @Get('/:id')
  async getEvent(@Param('id') id: string) {
    const event = await this.eventRepository.findOne({ id: +id });
    return event;
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @Permissions(Permission.EditEvent)
  async updateEvent(@Param('id') id: string, @Body() updateEventDTO: UpdateEventDTO) {
    let event = await this.eventRepository.findOne({ id: +id });
    event = {
      ...event,
      ...updateEventDTO,
    };
    await this.eventRepository.save(event);

    return event;
  }
}
