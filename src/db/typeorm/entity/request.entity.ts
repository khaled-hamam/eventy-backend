import { PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { EventPlannerEntity } from './eventplanner.entity';

@Entity('request')
export class RequestEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(type => EventPlannerEntity, planner => planner.pendingRequests)
  public planner: EventPlannerEntity;
}
