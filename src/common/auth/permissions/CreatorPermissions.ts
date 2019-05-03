import { Permission } from './permission.enum';
import { PermissionStrategy } from './PermissionStrategy';

export class CreatorPermissions implements PermissionStrategy {
  public getPermissions(): Permission[] {
    return [];
  }
}
