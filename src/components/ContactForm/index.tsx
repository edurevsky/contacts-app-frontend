import { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { contactsService, refreshTokenService } from "../../api";
import { AuthContext } from "../../contexts/AuthContext/auth-context";
import { IContact } from "../../interfaces/contact";
import Button from "../Button";
import "./contactform.css";

interface Props {
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>,
}

const ContactForm = ({ setContacts }: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const { token, refreshToken, setToken, invalidateSession } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState<boolean>(false);

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
        refreshTokenService(refreshToken as string, setToken, invalidateSession);
      })
      .finally(() => {
        clearInputs();
        setOpenModal(false);
      });
  }
  const clearInputs = () => {
    setName("");
    setEmail("");
    setNumber("");
    setPictureUrl("");
  }
  return (
    <>
      <div style={{ marginBottom: "5px" }}>
        <Button onClick={() => setOpenModal(value => !value)}>Add Contact</Button>
      </div>
      <div style={{ visibility: openModal ? "visible" : "hidden" }}>
        <form
          className="contact-form"
          onSubmit={saveContact}
        >
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          <div className="form-input">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-input">
            <label htmlFor="number">Number</label>
            <input type="text" id="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
          </div>
          <div className="form-input">
            <label htmlFor="pictureUrl">Picture Url</label>
            <input type="text" id="pictureUrl" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} required />
          </div>
          <Button>Save</Button>
        </form>
      </div>
    </>
  );
}

export default ContactForm;