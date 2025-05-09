import createHttpError from 'http-errors';

import {
  getContacts,
  getContactsById,
  addContacts,
  updateContacts,
  deleteContacts,
} from '../services/contacts.js';
import { notFoundHandler } from '../middlewares/notFoundHandler.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactSortFields } from '../db/models/Contacts.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactSortFields);
  const filters = parseContactFilterParams(req.query);
  filters.userId = req.user._id;
  const data = await getContacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });

  res.json({
    status: 200,
    message: 'Successfully find contacts',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getContactsById(id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully find contact with id=${id}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const contact = await addContacts({ ...req.body, userId: req.user._id });
  console.log('User in request:', req.user);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const data = await updateContacts(id, req.body);
  if (!data) notFoundHandler(req, res);
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteContacts(id);
  if (!data) notFoundHandler(req, res);
  res.status(204).send();
};
