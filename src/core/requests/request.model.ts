import { Event } from '@core/events/event.model';
import { EventPlanner } from '@core/users/planner.model';
import { RequestState } from './interfaces/requestState.enum';

export interface IRequest {
  event: Event;
  planner: EventPlanner;
  state: RequestState;
}

export class Request {
  public event: Event;
  public planner: EventPlanner;
  public state: RequestState;

  public constructor(data: IRequest) {
    Object.assign(this, {
      ...data,
    });
  }
}
