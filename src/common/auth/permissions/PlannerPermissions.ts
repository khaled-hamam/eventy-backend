import { Permission } from './permission.enum';
import { PermissionStrategy } from './PermissionStrategy';

export class PlannerPermissions implements PermissionStrategy {
  public getPermissions(): Permission[] {
    return [Permission.EditProfile];
  }
}
