import { IContact } from "../interfaces/contact";

function sortByContactName(a: IContact, b: IContact) {
  return a.name.localeCompare(b.name);
}

export default sortByContactName;