import { Permission } from './permissions/permission.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@common/services/jwt.service';
import { Observable } from 'rxjs';
import { PermissionsFactory } from './permissions/PermissionsFactory';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly permissionsFactory: PermissionsFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      return false;
    }

    const decoded = this.jwtService.verfiyToken(token);
    if (!decoded) {
      return false;
    }

    request.user = decoded;

    const routePermissions = this.reflector.get<Permission[]>('permissions', context.getHandler());
    if (routePermissions.length === 0) {
      return true;
    }

    const permissionStrategy = this.permissionsFactory.createPermissionStrategy(request.user.role);
    const userPermissions = permissionStrategy.getPermissions();

    let success = true;
    routePermissions.forEach(routePermission => {
      if (userPermissions.includes(routePermission) === false) {
        success = false;
      }
    });

    return success;
  }
}
