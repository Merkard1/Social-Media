import { diskStorage } from 'multer';

export const storageOptions = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
