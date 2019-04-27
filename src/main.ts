import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';

async function bootstrap() {
<<<<<<< Updated upstream
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
=======
  // Database Connection
  const db: DatabaseAdapter = new TypeORMAdapter();
  await db.connect(dbConfig);

  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
  });
>>>>>>> Stashed changes
}
bootstrap();
