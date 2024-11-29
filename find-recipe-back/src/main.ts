import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seedService = app.get(SeedService);
  await seedService.loadJsonData();

  app.enableCors({
    origin: 'http://localhost:4200', // L'origine de votre application Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes autorisées
    credentials: true, // Si vous devez envoyer des cookies ou des autorisations HTTP
  });

  await app.listen(3000);
}
bootstrap();
