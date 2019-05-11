import { RequestManager } from './../../common/mediators/request-manager.mediator';
import { Permissions } from '@common/auth/permissions/permissions.decorator';
import { Event } from './event.model';
import { EventRepository } from './event.repository';
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateEventDTO } from './dto/createEvent.dto';
import { UpdateEventDTO } from './dto/updateEvent.dto';
import { AuthGuard } from '@common/auth/auth.guard';
import { Permission } from '@common/auth/permissions/permission.enum';
import { UserToken } from '@common/decorators/user-token.decorator';
import { UserRepository } from '@core/users/user.repository';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly userRepository: UserRepository,
    @Inject('REQUEST_MANAGER') private readonly requestManager: RequestManager,
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @Permissions(Permission.CreateEvent)
  async createEvent(@Body() createEventDTO: CreateEventDTO, @UserToken() userToken: any) {
    const event = new Event(createEventDTO);
    event.creator = await this.userRepository.findOne({ username: userToken.username });
    const createdEvent = await this.eventRepository.save(event);
    this.requestManager.notify('NEW_EVENT', createdEvent);
    return createdEvent;
  }

  @Get('/:id')
  async getEvent(@Param('id') id: string) {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ['creator', 'planner'] });
    if (!event) {
      throw new NotFoundException('Event not found.');
    }

    return event;
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @Permissions(Permission.EditEvent)
  async updateEvent(@Param('id') id: string, @Body() updateEventDTO: UpdateEventDTO) {
    let event = await this.eventRepository.findOne({ id: +id });
    if (!event) {
      throw new NotFoundException('Event not found.');
    }

    event = {
      ...event,
      ...updateEventDTO,
    };

    await this.eventRepository.save(event);
    return event;
  }
}
