import 'express';

declare global {
  namespace Express {
    interface MulterS3File extends Multer.File {
      location: string;
      bucket: string;
      key: string;
      acl: string;
      contentType: string;
      contentDisposition?: string;
      storageClass?: string;
      serverSideEncryption?: string;
      metadata?: any;
      etag?: string;
      versionId?: string;
    }
  }
}

export {};
