import { Module } from '@nestjs/common';
import { PermissionsFactory } from './permissions/PermissionsFactory';

@Module({
  providers: [PermissionsFactory],
  exports: [PermissionsFactory],
})
export class AuthModule {}
