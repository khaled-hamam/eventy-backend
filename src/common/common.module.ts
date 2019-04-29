import { Module } from '@nestjs/common';
import { HashingService } from './services/hashing.service';
import { JwtService } from './services/jwt.service';

@Module({
  providers: [HashingService, JwtService],
  exports: [HashingService, JwtService],
})
export class CommonModule {}
