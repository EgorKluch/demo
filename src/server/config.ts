import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), 'config/env/.server.env')));

const config = {
  dbDateFormat: 'YY-MM-DD',
  port: env.PORT,
  db: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    name: env.DB_NAME
  },
};

export default config;
