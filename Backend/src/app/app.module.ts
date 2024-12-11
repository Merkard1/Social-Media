import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../modules/users/users.module';
import { ProfilesModule } from '../modules/profiles/profiles.module';
import { ArticlesModule } from '../modules/articles/articles.module';
import { CommentsModule } from '../modules/comments/comments.module';
import { NotificationsModule } from '../modules/notifications/notifications.module';
import { ArticleRatingsModule } from '../modules/article-ratings/article-ratings.module';
import { AuthModule } from '../modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsGateway } from '../modules/notifications/notifications.gateway';
import { UploadModule } from '../modules/upload/upload.module';
import { S3Module } from '../modules/s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DATABASE_PORT', '5432'), 10),
        username: configService.get<string>('DATABASE_USER', 'nestuser'),
        password: configService.get<string>(
          'DATABASE_PASSWORD',
          'somepassword',
        ),
        database: configService.get<string>('DATABASE_NAME', 'nestdb'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        logging: true,
      }),
    }),
    UploadModule,
    S3Module,
    UsersModule,
    ProfilesModule,
    ArticlesModule,
    CommentsModule,
    NotificationsModule,
    ArticleRatingsModule,
    AuthModule,
    NotificationsGateway,
  ],
})
export class AppModule {}
