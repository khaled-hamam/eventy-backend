import { Module, Global } from '@nestjs/common';
import { RequestManager } from './mediators/request-manager.mediator';
import { HashingService } from './services/hashing.service';
import { JwtService } from './services/jwt.service';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';

const RequestManagerProvider = { provide: 'REQUEST_MANAGER', useValue: RequestManager.instance };

@Global()
@Module({
  imports: [AuthModule, NotificationsModule],
  providers: [HashingService, JwtService, RequestManagerProvider],
  exports: [HashingService, JwtService, RequestManagerProvider],
})
export class CommonModule {}
