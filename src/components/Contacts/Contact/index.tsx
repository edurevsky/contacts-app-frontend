import React from "react";
import { contactsService, refreshTokenService } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { IContact } from "../../../interfaces/contact";
import Button from "../../Button";
import "./index.css";

interface Props {
  contact: IContact,
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>,
  setSelected: React.Dispatch<React.SetStateAction<IContact | undefined>>,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Contact = ({ contact, setContacts, setSelected, setOpenModal }: Props) => {
  const { token, refreshToken, setToken, invalidateSession } = useAuth();
  const { id, name, number, email, pictureUrl } = contact;

  const deleteContact = async (id: number) => {
    await contactsService.delete(`${id}`, {
      headers: {
        'Authorization': token as string
      }
    })
      .then(_ => setContacts(contacts => contacts.filter(c => c.id !== id)))
      .catch(_ => {
        alert("An error occurred");
        refreshTokenService(refreshToken as string, setToken, invalidateSession);
      });
  }
  const handleUpdateButton = () => {
    setSelected(contact);
    setOpenModal(true);
  }
  return (
    <div className="contact">
      <div className="contact-wrapper">
        <div className="contact-header">
          <div className="contact-img">
            <img src={pictureUrl} alt={name} />
          </div>
          <div className="contact-name">
            <h2>{name}</h2>
          </div>
        </div>
        <div className="contact-info">
          <p>Number: {number}</p>
          <p>Email: {email}</p>
        </div>
        <div className="contact-operations">
          <Button
            isFor="delete"
            onClick={() => { deleteContact(id); }}
          >
            Delete
          </Button>
          <form action={`mailto:${email}`}>
            <Button>Send mail</Button>
          </form>
          <Button type="button" onClick={handleUpdateButton}>Update</Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;