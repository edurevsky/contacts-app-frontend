import contactsService from "../../../api";
import { IContact } from "../../../interfaces/contact";

interface Props {
  contact: IContact,
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>
}

const Contact = ({ contact, setContacts }: Props) => {
  const deleteContact = async function (id: number) {
    const request = await contactsService.delete(`${id}`) ;
    if (request.status !== 204) {
      alert(`An error occurred while trying to delete your contact`)
      return;
    }
    setContacts(contacts => contacts.filter(c => c.id !== id));
  }
  const { id, name, number, email, pictureUrl } = contact;
  return (
    <div>
      <div>
        <img src={pictureUrl} alt={name} />
        <h2>{name}</h2>
      </div>
      <div>
        <p>Number: {number}</p>
        <p>Email: {email}</p>
      </div>
      <div>
        <button onClick={() => { deleteContact(id) }}>Delete</button>
      </div>
    </div>
  );
}

export default Contact;