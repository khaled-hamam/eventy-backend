import { PrimaryGeneratedColumn, ManyToOne, Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { EventPlannerEntity } from './eventplanner.entity';
import { ILocation } from '@core/events/interfaces/ilocation';
import { EventOptions } from '@core/events/interfaces/eventOptions';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public date: Date;

  @Column()
  public latitude: string;

  @Column()
  public longitude: string;

  public get location(): ILocation {
    return { latitude: this.latitude, longitude: this.longitude };
  }

  @Column()
  public type: string;

  @Column()
  public budget: number;

  @Column()
  public attendeesLimit: number;

  @Column({ type: 'simple-array', nullable: true })
  public eventOptions: number[];

  @Column('simple-array')
  public photosURL: string[];

  @ManyToOne(type => UserEntity, user => user.events)
  @JoinColumn({ name: 'creatorUsername' })
  public creator: UserEntity;

  @ManyToOne(type => EventPlannerEntity, planner => planner.events)
  @JoinColumn({ name: 'plannerUsername', referencedColumnName: 'username' })
  public planner: EventPlannerEntity;
}
