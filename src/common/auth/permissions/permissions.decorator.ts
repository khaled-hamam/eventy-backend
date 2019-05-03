import { SetMetadata } from '@nestjs/common';
import { Permission } from './permission.enum';

export const Permissions = (...permissions: Permission[]) => SetMetadata('permissions', permissions);
