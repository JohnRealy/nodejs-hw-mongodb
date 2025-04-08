import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

const generateContacts = async (number) => {
  const contactsList = await readContacts();
  const newContacts = Array(5).fill('^.^').map(createFakeContact);
  writeContacts([...contactsList, ...newContacts]);
};

generateContacts(5);
