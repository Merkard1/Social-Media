import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { MulterConfigService } from '@/config/multer.config';
import { S3ConfigService } from '@/config/s3.config';
import { ConfigService } from '@nestjs/config';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        MulterConfigService,
        S3ConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const env = {
                AWS_ACCESS_KEY_ID: 'test-access-key-id',
                AWS_SECRET_ACCESS_KEY: 'test-secret-access-key',
                AWS_S3_REGION: 'us-east-1',
                AWS_S3_BUCKET_NAME: 'test-bucket',
              };
              return env[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
