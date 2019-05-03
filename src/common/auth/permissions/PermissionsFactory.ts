import { PermissionStrategy } from './PermissionStrategy';
import { PlannerPermissions } from './PlannerPermissions';
import { CreatorPermissions } from './CreatorPermissions';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsFactory {
  public createPermissionStrategy(role: string): PermissionStrategy {
    if (role === 'creator') {
      return new CreatorPermissions();
    } else if (role === 'planner') {
      return new PlannerPermissions();
    }
  }
}
