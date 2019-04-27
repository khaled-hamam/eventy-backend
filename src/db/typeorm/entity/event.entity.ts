import { PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { UserEntity } from './user.entity';
import { EventPlannerEntity } from './eventplanner.entity';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(type => UserEntity, user => user.events)
  public creator: UserEntity;

  @ManyToOne(type => EventPlannerEntity, planner => planner.user.events)
  public planner: UserEntity;
}
