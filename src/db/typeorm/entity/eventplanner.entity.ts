import { Column, OneToMany, Entity, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RequestEntity } from './request.entity';

@Entity('event_planner')
export class EventPlannerEntity {
  @OneToOne(type => UserEntity, { primary: true })
  @JoinColumn()
  public user: UserEntity;

  @Column()
  public rating: number;

  @OneToMany(type => RequestEntity, request => request.planner)
  public pendingRequests: RequestEntity[];
}
