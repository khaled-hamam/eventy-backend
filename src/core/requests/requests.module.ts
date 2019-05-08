import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestRepository } from './request.repository';

@Module({
  imports: [],
  controllers: [RequestsController],
  providers: [RequestRepository],
})
export class RequestsModule {}
