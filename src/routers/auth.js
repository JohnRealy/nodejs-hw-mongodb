import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validataBody } from '../utils/validateBody.js';

import { authLoginSchema, authRegisterSchema } from '../validation/auth.js';
import { loginControler, registerControler } from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validataBody(authRegisterSchema),
  ctrlWrapper(registerControler),
);

authRouter.post(
  '/login',
  validataBody(authLoginSchema),
  ctrlWrapper(loginControler),
);
