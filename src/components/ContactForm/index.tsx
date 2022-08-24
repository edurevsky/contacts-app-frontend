import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { refreshTokenService, saveContact, updateContact } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import { IContact } from "../../interfaces/contact";
import Button from "../Button";
import Form from "../Form";
import FormInput from "../Form/FormInput";

interface Props {
  openModal: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>,
  selected: IContact | undefined,
  setSelected: React.Dispatch<React.SetStateAction<IContact | undefined>>
}

const ContactForm = ({ openModal, setOpenModal, setContacts, selected, setSelected }: Props) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const { userId, token, refreshToken, setToken, invalidateSession } = useAuth();

  useEffect(() => {
    if (selected) {
      setIsUpdate(true);
      setId(selected.id);
      setName(selected.name);
      setEmail(selected.email);
      setNumber(selected.number);
      setPictureUrl(selected.pictureUrl);
      return;
    }
    setIsUpdate(false);
    setName("");
    setEmail("");
    setNumber("");
    setPictureUrl("");
  }, [selected]);

  const handleSaveContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let contact = { name, email, number, pictureUrl };
    if (isUpdate) {
      await updateContact({ ...contact, id }, token as string)
        .then((res: AxiosResponse<IContact>) => {
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
          refreshTokenService(refreshToken as string, setToken, invalidateSession);
        })
        .finally(() => {
          clearInputs();
          setSelected(undefined);
          setOpenModal(false);
        });
      return;
    }
    await saveContact({ ...contact, 'userId': userId! }, token as string)
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
  const handleCloseButton = () => {
    setOpenModal(false);
    setSelected(undefined);
  }
  return (
    <>
      <div style={{ marginBottom: "5px" }}>
        <Button isFor="add" onClick={() => setOpenModal(value => !value)}>Add Contact</Button>
      </div>
      <div style={{
        visibility: openModal ? "visible" : "hidden",
        opacity: openModal ? "1" : "0",
        transition: "all 0.075s ease-in"
      }}>
        <Form
          isModal={true}
          hasTitle="Add Contact"
          onSubmit={handleSaveContact}
        >
          <FormInput id="name" value={name} onChange={(e) => setName(e.target.value)} required={true}>
            Name
          </FormInput>
          <FormInput id="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true}>
            Email
          </FormInput>
          <FormInput id="number" value={number} onChange={(e) => setNumber(e.target.value)} required={true}>
            Number
          </FormInput>
          <FormInput id="pictureUrl" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} required={true}>
            Picture Url
          </FormInput>
          <Button type="submit" isFor="add">Save</Button>
          <Button type="button" onClick={handleCloseButton}>Close</Button>
        </Form>
      </div>
    </>
  );
}

export default ContactForm;