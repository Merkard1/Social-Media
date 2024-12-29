import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config(); // Load .env file if present

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER || 'nestuser',
  password: process.env.DATABASE_PASSWORD || 'LordStarkWinter',
  database: process.env.DATABASE_NAME || 'nestdb',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

export default ormconfig;
