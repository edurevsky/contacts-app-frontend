import { useEffect, useState } from 'react';
import contactsService from './api';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import Header from './components/Header';
import Pagination from './components/Pagination';
import { IContact } from './interfaces/contact';
import { IPageableContacts } from './interfaces/pageable-contacts';

function App() {
  const [page, setPage] = useState(0);
  const [pageable, setPageable] = useState<IPageableContacts>();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    (async function () {
      await contactsService.get<IPageableContacts>(`?page=${page}&size=2`)
        .then(res => {
          setPageable(res.data);
          setContacts(res.data.content);
        })
    })();
  }, [page]);

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
      {pageable &&
        (<Pagination pageable={pageable} setPage={setPage} />)}
      <ContactForm
        setContacts={setContacts}
      />
    </div>
  );
}

export default App;
