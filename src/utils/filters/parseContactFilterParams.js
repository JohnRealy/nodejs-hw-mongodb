import { contactsType } from '../../constants/contacts.js';

const parseBoolean = (value) => {
  if (value === 'true' || value === true) return true;
  return false;
};

// const parseType = (value) => {
//   if (contactsType.includes(value)) return value;
//   return contactsType[2];
// };

export const parseContactFilterParams = ({ isFavourite, type }) => {
  const parsedFav = parseBoolean(isFavourite);
  const parsedType = contactsType.includes(type) ? type : undefined;

  return {
    isFavourite: parsedFav,
    type: parsedType,
  };
};
