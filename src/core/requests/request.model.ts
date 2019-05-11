import { Event } from '@core/events/event.model';
import { EventPlanner } from '@core/users/planner.model';
import { RequestState } from './interfaces/requestState.enum';

export interface IRequest {
  id?: number;
  event: Event;
  planner: EventPlanner;
  state?: RequestState;
}

export class Request {
  public id: number;
  public event: Event;
  public planner: EventPlanner;
  public state: RequestState;

  public constructor(data: IRequest) {
    Object.assign(this, {
      state: RequestState.Pending,
      ...data,
    });
  }
}
