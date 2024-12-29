import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SOCIAL_MEDIA_BACK_PORT || 4444;

  const config = new DocumentBuilder()
    .setTitle('Social Media API')
    .setDescription('Social Media API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        if (!errors || !Array.isArray(errors)) {
          return new BadRequestException('Invalid request');
        }
        const messages = errors.map(
          (error) =>
            `${error.property} - ${Object.values(error.constraints).join(', ')}`,
        );
        return new BadRequestException(messages);
      },
    }),
  );
  app.use(cookieParser());

  try {
    await app.listen(port);
    console.log(
      `🚀 Backend Application is running on: http://localhost:${port}`,
    );
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
