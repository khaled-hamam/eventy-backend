import { Injectable } from '@nestjs/common';

import { BaseTypeORMRepository } from '@db/typeorm/BaseTypeORMRepository';
import { EventEntity } from '@db/typeorm/entity/event.entity';
import { Event } from './event.model';
import { SaveOptions } from 'typeorm';

@Injectable()
export class EventRepository extends BaseTypeORMRepository<Event, EventEntity> {
  public constructor() {
    super(EventEntity);
  }

  public async save(model: Event, options?: SaveOptions): Promise<Event> {
    return await this.context.save(
      {
        ...model,
        ...model.location,
        creatorUsername: model.creator.username,
        plannerUsername: model.planner.username,
      },
      options,
    );
  }

  protected toModel(entity: EventEntity): Event {
    return new Event(entity);
  }

  protected getCriteria(model: Event): object {
    return { id: model.id };
  }
}
