import { Injectable, Inject } from '@nestjs/common';
import { RequestRepository } from './../request.repository';
import { AssignStrategy } from './assign-strategies/assign-strategy.interface';
import { Request } from '../request.model';
import { RequestManager } from '@common/mediators/request-manager.mediator';
import { Event } from '@core/events/event.model';
import { PlannerRepository } from '@core/users/planner.repository';

@Injectable()
export class RequestAutomationService {
  public constructor(
    @Inject('REQUEST_MANAGER') private readonly requestManager: RequestManager,
    private readonly plannerRepository: PlannerRepository,
    private readonly requestRepository: RequestRepository,
    @Inject('ASSIGN_STRATEGY') private assignStrategy: AssignStrategy,
  ) {
    this.requestManager.subscribe('NEW_EVENT', this.assignPlanner.bind(this));
    this.requestManager.subscribe('REJECTED_REQUEST', this.assignPlanner.bind(this));
  }

  private async assignPlanner(event: Event) {
    const planners = await this.plannerRepository.findUnusedPlanners(event);
    const chosenPlanner = this.assignStrategy.assignPlanner(event, planners);

    const request = new Request({ event, planner: chosenPlanner });
    const savedRequest = await this.requestRepository.save(request);

    this.requestManager.notify('NEW_REQUEST', savedRequest);
  }
}
