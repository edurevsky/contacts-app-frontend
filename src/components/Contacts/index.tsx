import { IContact } from "../../interfaces/contact";
import Contact from "./Contact";

interface Props {
  contacts: IContact[],
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>
}

const Contacts = ({ contacts, setContacts }: Props) => {

  return (
    <div>
      {contacts.map(c => (
        <div key={c.id}>
          <Contact
            contact={c}
            setContacts={setContacts}
          />
        </div>
      ))}
    </div>
  );
}

export default Contacts;