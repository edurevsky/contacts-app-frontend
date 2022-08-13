import { useEffect, useState } from 'react';
import contactsService from './api';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import Header from './components/Header';
import { IContact } from './interfaces/contact';

function App() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    (async function () {
      await contactsService.get("")
        .then(res => setContacts(res.data.content))
    })();
  }, []);

  return (
    <div>
      <Header
        filter={filter}
        setFilter={setFilter}
      />
      <Contacts
        contacts={contacts.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))}
        setContacts={setContacts}
      />
      <ContactForm
        setContacts={setContacts}
      />
    </div>
  );
}

export default App;
