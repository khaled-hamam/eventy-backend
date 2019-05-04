import { EventRepository } from './event.repository';
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { AppModule } from '@core/app.module';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [EventRepository],
})
export class EventsModule {}
