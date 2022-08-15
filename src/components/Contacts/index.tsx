import { IContact } from "../../interfaces/contact";
import Contact from "./Contact";
import "./contacts.css";

interface Props {
  contacts: IContact[],
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>
}

const Contacts = ({ contacts, setContacts }: Props) => {

  return (
    <div className="contacts">
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