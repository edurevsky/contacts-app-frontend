import { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { contactsService } from "../../api";
import { AuthContext } from "../../contexts/AuthContext/auth-context";
import { IContact } from "../../interfaces/contact";

interface Props {
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>,
}

const ContactForm = ({ setContacts }: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const { token } = useContext(AuthContext);

  const saveContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contact = { name, email, number, pictureUrl }
    await contactsService.post("", contact, {
      headers: {
        'Authorization': token as string
      }
    })
      .then((res: AxiosResponse) => {
        setContacts(contacts => [...contacts, res.data]);
      })
      .catch(_ => {
        alert("An error occurred, try again later.");
      })
      .finally(() => {
        clearInputs();
      });
  }
  const clearInputs = () => {
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
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <input type="text" id="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="pictureUrl">Picture Url</label>
          <input type="text" id="pictureUrl" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ContactForm;