import { Injectable } from '@nestjs/common';

import { BaseTypeORMRepository } from '@db/typeorm/BaseTypeORMRepository';
import { EventPlannerEntity } from '@db/typeorm/entity/eventplanner.entity';
import { EventPlanner } from './planner.model';

@Injectable()
export class PlannerRepository extends BaseTypeORMRepository<EventPlanner, EventPlannerEntity> {
  public constructor() {
    super(EventPlannerEntity);
  }

  public async save(model: EventPlanner): Promise<EventPlanner> {
    return await this.context.save({ username: model.username, rating: model.rating, user: model });
  }

  protected toModel(entity: EventPlannerEntity): EventPlanner {
    return new EventPlanner(entity);
  }

  protected getCriteria(model: EventPlanner): object {
    return { username: model.username };
  }
}
