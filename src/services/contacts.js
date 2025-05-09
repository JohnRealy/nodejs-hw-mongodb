import ContactsCollection from '../db/models/Contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { sortList } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = ContactsCollection.find();

  if (filters.userId) {
    contactQuery.where('userId').equals(filters.userId);
  }

  if (filters.type) {
    contactQuery.where('type').equals(filters.type);
  }

  if (typeof filters.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const totalItems = await ContactsCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    data,
    totalItems,
    page,
    perPage,
    ...paginationData,
  };
};
export const getContactsById = (id) => ContactsCollection.findOne({ _id: id });

export const addContacts = (payload) => ContactsCollection.create(payload);

export const updateContacts = async (_id, payload) => {
  const data = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  });

  return data;
};

export const deleteContacts = (_id) =>
  ContactsCollection.findOneAndDelete({ _id });
