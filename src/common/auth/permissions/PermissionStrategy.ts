import { Permission } from './permission.enum';

export interface PermissionStrategy {
  getPermissions(): Permission[];
}
