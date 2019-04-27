import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column()
  public mobile: string;

  @Column()
  public pictureURL: string;

  @OneToMany(type => EventEntity, event => event.creator)
  public events: EventEntity[];
}
