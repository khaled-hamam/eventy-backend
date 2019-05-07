import { Injectable } from '@nestjs/common';

import { BaseTypeORMRepository } from '@db/typeorm/BaseTypeORMRepository';
import { EventEntity } from '@db/typeorm/entity/event.entity';
import { Event } from './event.model';

@Injectable()
export class EventRepository extends BaseTypeORMRepository<Event, EventEntity> {
  public constructor() {
    super(EventEntity);
  }
  protected toModel(entity: EventEntity): Event {
    return new Event(entity);
  }

  protected getCriteria(model: Event): object {
    return { id: model.id };
  }
}
