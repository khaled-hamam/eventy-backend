import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [UsersModule, EventsModule, RequestsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
