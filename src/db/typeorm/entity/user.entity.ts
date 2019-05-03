import { Entity, Column, PrimaryColumn, OneToMany, Unique } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public fullName: string;

  @Column()
  public password: string;

  @Column()
  public mobile: string;

  @Column()
  public pictureURL: string;

  @OneToMany(type => EventEntity, event => event.creator)
  public events: EventEntity[];
}
