import { readContacts } from '../utils/readContacts.js';

export const getAllContacts = async () => await readContacts();

console.log(await getAllContacts());
