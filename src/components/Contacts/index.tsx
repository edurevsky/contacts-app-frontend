import React from "react";
import { IContact } from "../../interfaces/contact";
import Contact from "./Contact";
import "./contacts.css";

interface Props {
  contacts: IContact[],
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>,
  setSelected: React.Dispatch<React.SetStateAction<IContact | undefined>>,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Contacts = ({ contacts, ...rest }: Props) => {
  return (
    <div className="contacts">
      {contacts.map(c => (
        <div key={c.id}>
          <Contact
            contact={c}
            {...rest}
          />
        </div>
      ))}
    </div>
  );
}

export default Contacts;