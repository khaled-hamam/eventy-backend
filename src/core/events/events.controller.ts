import { Event } from './event.model';
import { EventRepository } from './event.repository';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { response } from 'express';
import { CreateEventDTO } from './dto/createEvent.dto';
import { UpdateEventDTO } from './dto/updateEvent.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventRepository: EventRepository) {}

  @Post('/')
  async createEvent(@Body() createEventDTO: CreateEventDTO) {
    let event = new Event(createEventDTO);

    await this.eventRepository.save(event);
    response.status(201);
  }

  @Get('/:id')
  async getEvent(@Param() eventID: string) {
    const event = await this.eventRepository.findOne({ id: +eventID });
    return event;
  }

  @Put('/:id')
  async updateEvent(@Param() eventID: string, @Body() updateEventDTO: UpdateEventDTO) {
    let event = await this.eventRepository.findOne({ id: +eventID });
    event = { ...event, ...updateEventDTO };

    await this.eventRepository.save(event);

    return event;
  }
}
