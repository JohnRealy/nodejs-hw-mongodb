import express from 'express';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
// import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { contactsRouter } from './routers/contacts.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  // app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Server started',
    });
  });

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server runnin on ${port} port`));
};
