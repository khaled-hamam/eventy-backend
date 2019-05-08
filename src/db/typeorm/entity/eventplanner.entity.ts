import {
  Column,
  OneToMany,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RequestEntity } from './request.entity';
import { EventEntity } from './event.entity';

@Entity('event_planner')
export class EventPlannerEntity {
  @OneToOne(type => UserEntity)
  @JoinColumn({ name: 'username' })
  public user: UserEntity;

  @PrimaryColumn()
  public username: string;

  @Column()
  public rating: number;

  @OneToMany(type => RequestEntity, request => request.planner)
  public pendingRequests: RequestEntity[];

  public get email(): string {
    return this.user.email;
  }

  public get fullName(): string {
    return this.user.fullName;
  }

  public get password(): string {
    return this.user.password;
  }

  public get mobile(): string {
    return this.user.mobile;
  }

  public get pictureURL(): string {
    return this.user.pictureURL;
  }

  public get events(): EventEntity[] {
    return this.user.events;
  }
}
