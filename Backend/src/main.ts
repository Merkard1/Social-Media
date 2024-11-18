import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SOCIAL_MEDIA_BACK_PORT || 4444;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  try {
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use.`);
    } else {
      console.error(`Failed to start the application: ${err.message}`);
    }
    process.exit(1);
  }
}
bootstrap();
