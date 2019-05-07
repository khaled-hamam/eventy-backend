import { Injectable } from '@nestjs/common';

import { BaseTypeORMRepository } from '@db/typeorm/BaseTypeORMRepository';
import { UserEntity } from '@db/typeorm/entity/user.entity';
import { User } from './user.model';

@Injectable()
export class UserRepository extends BaseTypeORMRepository<User, UserEntity> {
  public constructor() {
    super(UserEntity);
  }

  protected toModel(entity: UserEntity): User {
    return new User(entity);
  }

  protected getCriteria(model: User): object {
    return { username: model.username };
  }
}
