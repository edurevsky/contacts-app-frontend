import { useEffect, useState } from "react";
import contactsService from "../../api";
import ContactForm from "../../components/ContactForm";
import Contacts from "../../components/Contacts";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { IContact } from "../../interfaces/contact";
import { IPageableContacts } from "../../interfaces/pageable-contacts";

const ContactsPage = () => {
  const [page, setPage] = useState(0);
  const [pageable, setPageable] = useState<IPageableContacts>();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    (async function () {
      console.log("ok");
      await contactsService.get<IPageableContacts>(`?page=${page}&size=15`)
        .then(res => {
          setPageable(res.data);
          setContacts(res.data.content);
        })
        .catch((_) => {
          alert("Something went wrong")
        });
    })();
  }, [page]);

  return (
    <>
      <Header
        filter={filter}
        setFilter={setFilter}
      />
      {pageable &&
        (<>
          <Contacts
            contacts={contacts.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))}
            setContacts={setContacts}
          />
          <Pagination pageable={pageable} setPage={setPage} />
        </>)}
      <ContactForm
        setContacts={setContacts}
      />
    </>
  );
}

export default ContactsPage;