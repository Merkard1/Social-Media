import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from './s3.config';

export const multerOptions = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
    acl: 'public-read',
    key: (req, file, cb) => {
      const uniqueSuffix =
        Date.now().toString() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `articles/${uniqueSuffix}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'image'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
};

export const uploadMulter = multer(multerOptions);
