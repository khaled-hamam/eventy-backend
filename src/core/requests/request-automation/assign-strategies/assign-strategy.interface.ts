import { Event } from '@core/events/event.model';
import { EventPlanner } from '@core/users/planner.model';

export interface AssignStrategy {
  assignPlanner: (event: Event, planners: EventPlanner[]) => EventPlanner | undefined;
}
