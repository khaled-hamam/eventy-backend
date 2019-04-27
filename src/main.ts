import { NestFactory } from '@nestjs/core';

import { AppModule } from '@core/app.module';
import { TypeORMAdapter } from '@db/typeorm/TypeORMAdapter';
import { DatabaseAdapter } from '@db/interfaces/DatabaseAdapter';
import { config as dbConfig } from '@config/typeorm.config';

async function bootstrap() {
<<<<<<< Updated upstream
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  await app.listen(3000);
=======
=======
  const PORT = process.env.PORT || 3000;

>>>>>>> 60f59d2f6f3521cf9fa5c286e16449f40eccdd97
  // Database Connection
  const db: DatabaseAdapter = new TypeORMAdapter();
  await db.connect(dbConfig);

<<<<<<< HEAD
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
  });
>>>>>>> Stashed changes
=======
  await app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
  });
>>>>>>> 60f59d2f6f3521cf9fa5c286e16449f40eccdd97
}
bootstrap();
