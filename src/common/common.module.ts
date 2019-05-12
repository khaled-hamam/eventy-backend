import { Module, Global } from '@nestjs/common';
import { RequestManager } from './mediators/request-manager.mediator';
import { HashingService } from './services/hashing.service';
import { JwtService } from './services/jwt.service';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RedisService } from '@db/redis/redis.service';

const RequestManagerProvider = { provide: 'REQUEST_MANAGER', useValue: RequestManager.instance };
const RedisProvider = { provide: 'REDIS_SERVICE', useValue: RedisService.instance };

@Global()
@Module({
  imports: [AuthModule, NotificationsModule],
  providers: [HashingService, JwtService, RequestManagerProvider, RedisProvider],
  exports: [HashingService, JwtService, RequestManagerProvider, RedisProvider],
})
export class CommonModule {}
