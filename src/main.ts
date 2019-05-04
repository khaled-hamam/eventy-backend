import { NestFactory } from '@nestjs/core';

import { AppModule } from '@core/app.module';
import { TypeORMAdapter } from '@db/typeorm/TypeORMAdapter';
import { DatabaseAdapter } from '@db/interfaces/DatabaseAdapter';
import { config as dbConfig } from '@config/typeorm.config';
import { config as loggerConfig } from '@config/logger.config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@utils/logger/Logger';

async function bootstrap() {
  Logger.instance.configure(loggerConfig);

  // Database Connection
  const db: DatabaseAdapter = new TypeORMAdapter();
  await db.connect(dbConfig);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
  });
}
bootstrap();
