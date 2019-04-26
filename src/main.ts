import { NestFactory } from '@nestjs/core';

import { AppModule } from '@core/app.module';
import { TypeORMAdapter } from '@db/typeorm/TypeORMAdapter';
import { DatabaseAdapter } from '@db/interfaces/DatabaseAdapter';
import { config as dbConfig } from '@config/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  // Database Connection
  const db: DatabaseAdapter = new TypeORMAdapter();
  await db.connect(dbConfig);

  await app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
  });
}
bootstrap();
