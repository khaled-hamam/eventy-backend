import { ProfileModule } from './profile/profile.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [UsersModule, EventsModule, RequestsModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
