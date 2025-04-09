import ContactsCollection from '../db/models/Contacts.js';

export const getContacts = () => ContactsCollection.find();

export const getContactsById = (id) => ContactsCollection.findOne({ _id: id });

export const addContacts = (payload) => ContactsCollection.create(payload);

export const updateContacts = async (_id, payload) => {
  const data = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });

  return data;
};

export const deleteContacts = (_id) =>
  ContactsCollection.findOneAndDelete({ _id });
