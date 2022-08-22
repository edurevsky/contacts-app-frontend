import { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { contactsService, refreshTokenService } from "../../api";
import { AuthContext } from "../../contexts/AuthContext/auth-context";
import { IContact } from "../../interfaces/contact";
import Button from "../Button";
import Form from "../Form";
import FormInput from "../Form/FormInput";

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
          onSubmit={saveContact}
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
          <Button type="button" onClick={() => setOpenModal(false)}>Close</Button>
        </Form>
      </div>
    </>
  );
}

export default ContactForm;