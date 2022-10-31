import { AxiosResponse } from "axios";
import React, { useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { deleteContact, favoriteContact, refreshTokenService } from "../../../api";
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
  const { id, name, number, email, pictureUrl, favorite } = contact;

  const handleDeleteContact = async (id: number) => {
    await deleteContact(id, token as string)
      .then(_ => setContacts(contacts => contacts.filter(c => c.id !== id)))
      .catch(_ => {
        alert("An error occurred");
        refreshTokenService(refreshToken as string, setToken, invalidateSession);
      });
  }

  const deleteContactCallback = useCallback(
    handleDeleteContact, 
    [invalidateSession, refreshToken, setContacts, setToken, token]
  );

  const handleUpdateButton = () => {
    setSelected(contact);
    setOpenModal(true);
  }

  const handleFavoriteContact = async (id: number) => {
    await favoriteContact(id, token as string)
      .then((res: AxiosResponse) => {
        setContacts(contacts => {
          return contacts.map(contact => {
            if (contact.id === id) {
              return res.data;
            }
            return contact;
          });
        });
      })
      .catch(_ => {
        console.log(_);
        refreshTokenService(refreshToken!, setToken, invalidateSession);
      });
  }

  const favoriteContactCallback = useCallback(
    handleFavoriteContact,
    [invalidateSession, refreshToken, setContacts, setToken, token]
  );
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
          <div className="contact-favorite">
            <FaStar 
              style={{
                cursor: "pointer",
                color: favorite ? "#ffac00" : "#aaa"
              }}
              onClick={() => favoriteContactCallback(id)} 
            />
          </div>
        </div>
        <div className="contact-info">
          <p>Number: {number}</p>
          <p>Email: {email}</p>
        </div>
        <div className="contact-operations">
          <Button
            isFor="delete"
            onClick={() => deleteContactCallback(id)}
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