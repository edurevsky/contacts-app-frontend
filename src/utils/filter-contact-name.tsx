import { IContact } from "../interfaces/contact";

function filterContactName(contact: IContact, filter: string) {
  return contact.name.toLowerCase().includes(filter.toLowerCase());
}

export default filterContactName;