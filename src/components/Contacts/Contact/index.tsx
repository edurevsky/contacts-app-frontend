import { contactsService } from "../../../api";
import { IContact } from "../../../interfaces/contact";
import "./contact.css";

interface Props {
  contact: IContact,
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>
}

const Contact = ({ contact, setContacts }: Props) => {
  const deleteContact = async (id: number) => {
    await contactsService.delete(`${id}`)
      .then(_ => setContacts(contacts => contacts.filter(c => c.id !== id)))
      .catch(_ => {
        alert("An error occurred");
      });
  }
  const { id, name, number, email, pictureUrl } = contact;
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
          <button
            className="delete-btn"
            onClick={() => { deleteContact(id) }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;