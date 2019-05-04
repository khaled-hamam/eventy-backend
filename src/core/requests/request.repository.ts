import { Injectable } from '@nestjs/common';

import { BaseTypeORMRepository } from '@db/typeorm/BaseTypeORMRepository';
import { RequestEntity } from '@db/typeorm/entity/request.entity';
import { Request } from './request.model';

@Injectable()
export class RequestRepository extends BaseTypeORMRepository<Request, RequestEntity> {
  public constructor() {
    super(RequestEntity);
  }
  protected toModel(entity: RequestEntity): Request {
    return new Request(entity);
  }

  protected getCriteria(model: Request): object {
    return { event: model.event };
  }
}
