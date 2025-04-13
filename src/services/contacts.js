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

  const filtersQuery = {};

  if (filters.type) {
    filtersQuery.contactType = filters.type;
  }

  if (typeof filters.isFavourite !== 'undefined') {
    filtersQuery.isFavourite = filters.isFavourite;
  }

  const data = await ContactsCollection.find(filtersQuery)
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactsCollection.countDocuments(filtersQuery);

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
