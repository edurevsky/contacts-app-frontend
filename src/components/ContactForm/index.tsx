import React, { useState } from "react";
import contactsService from "../../api";
import { IContact } from "../../interfaces/contact";
import sortByContactName from "../../utils/sort-by-name";

interface Props {
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>,
}

const ContactForm = ({ setContacts }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const saveContact = async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const contact = { name, email, number, pictureUrl }
    try {
      const req = await contactsService.post("", contact);
      const newContact = await req.data;
      setContacts(contacts => [...contacts, newContact].sort(sortByContactName));  
    } catch (error) {
      alert(`An error occurred, try again later.`);
    } finally {
      clearInputs();
    }
  }
  const clearInputs = function () {
    setName("");
    setEmail("");
    setNumber("");
    setPictureUrl("");
  }
  return (
    <div>
      <form className="contact-form" onSubmit={saveContact}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <input type="text" id="number" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div>
          <label htmlFor="pictureUrl">Picture Url</label>
          <input type="text" id="pictureUrl" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ContactForm;