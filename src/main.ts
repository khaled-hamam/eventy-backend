import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as sendGrid from '@sendgrid/mail';
import * as dotenv from 'dotenv';
// Reading Env File
dotenv.config();

import { AppModule } from '@core/app.module';
import { TypeORMAdapter } from '@db/typeorm/TypeORMAdapter';
import { DatabaseAdapter } from '@db/interfaces/DatabaseAdapter';
import { config as dbConfig } from '@config/typeorm.config';
import { config as sendGridConfig } from '@config/sendgrid.config';

async function bootstrap() {
  // Send Grid Config
  sendGrid.setApiKey(sendGridConfig.API_KEY);

  // Database Connection
  const db: DatabaseAdapter = new TypeORMAdapter();
  await db.connect(dbConfig);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3001'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
  });
}
bootstrap();
