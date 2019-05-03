import { Module, Global } from '@nestjs/common';
import { HashingService } from './services/hashing.service';
import { JwtService } from './services/jwt.service';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [AuthModule],
  providers: [HashingService, JwtService],
  exports: [HashingService, JwtService],
})
export class CommonModule {}
