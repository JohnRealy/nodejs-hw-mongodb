import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import fs from 'node:fs';
import swaggerUi from 'swagger-ui-express';

const PORT = Number(env('PORT', '3000'));

const filename = fileURLToPath(import.meta.url);
const dirpath = dirname(filename);

const swaggerPath = path.join(dirpath, '..', 'docs', 'swagger.json');

const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
