import { Router } from 'express';

import {
  getContactsByIdController,
  getContactsController,
  addContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:id', ctrlWrapper(getContactsByIdController));

contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.patch('/:id', ctrlWrapper(updateContactController));

contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));
