import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { EventPlanner } from '@core/users/planner.model';
import { Event } from '@core/events/event.model';
import { AssignStrategy } from './assign-strategy.interface';

@Injectable()
export class FirstMatchStrategy implements AssignStrategy {
  public assignPlanner(event: Event, planners: EventPlanner[]): EventPlanner | undefined {
    let chosenPlanner: EventPlanner;
    for (const planner of planners) {
      let isBusy = false;
      for (const plannerEvent of planner.events) {
        if (moment(plannerEvent.date).format('LL') === moment(plannerEvent.date).format('LL')) {
          isBusy = true;
          break;
        }
      }

      if (!isBusy) {
        chosenPlanner = planner;
        break;
      }
    }

    return chosenPlanner;
  }
}
