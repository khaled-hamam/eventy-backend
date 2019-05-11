import { Injectable } from '@nestjs/common';

import { BaseTypeORMRepository } from '@db/typeorm/BaseTypeORMRepository';
import { EventPlannerEntity } from '@db/typeorm/entity/eventplanner.entity';
import { Event } from '@core/events/event.model';
import { EventPlanner } from './planner.model';

@Injectable()
export class PlannerRepository extends BaseTypeORMRepository<EventPlanner, EventPlannerEntity> {
  public constructor() {
    super(EventPlannerEntity);
  }

  public async findUnusedPlanners(event: Event) {
    const planners: EventPlannerEntity[] = await this.context.query(
      `SELECT * from event_planner LEFT JOIN user ON event_planner.username = user.username
      WHERE event_planner.username NOT IN (
        SELECT plannerUsername FROM request
        WHERE eventId = ${event.id}
      );`,
    );

    return planners.map(this.toModel);
  }

  public async save(model: EventPlanner): Promise<EventPlanner> {
    return await this.context.save({ username: model.username, rating: model.rating, user: model });
  }

  protected toModel(entity: EventPlannerEntity): EventPlanner {
    return new EventPlanner({ ...entity, ...entity.user });
  }

  protected getCriteria(model: EventPlanner): object {
    return { username: model.username };
  }
}
