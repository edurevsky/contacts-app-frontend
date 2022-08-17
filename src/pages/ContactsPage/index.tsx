import { useContext, useEffect, useState } from "react";
import { contactsService, refreshTokenService } from "../../api";
import ContactForm from "../../components/ContactForm";
import Contacts from "../../components/Contacts";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { AuthContext } from "../../contexts/AuthContext/auth-context";
import { IContact } from "../../interfaces/contact";
import { IPageableContacts } from "../../interfaces/pageable-contacts";

const ContactsPage = () => {
  const [page, setPage] = useState<number>(0);
  const [pageable, setPageable] = useState<IPageableContacts>();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filter, setFilter] = useState<string>("");
  const { token, refreshToken, setToken, invalidateSession } = useContext(AuthContext);

  useEffect(() => {
    const fetchContacts = async () => {
      console.log(token);
      return await contactsService.get<IPageableContacts>(`?page=${page}&size=15`, {
        headers: {
          'Authorization': token as string
        }
      })
        .then(res => {
          console.log("ok");
          setPageable(res.data);
          setContacts(res.data.content);
        })
        .catch(_ => {
          refreshTokenService(refreshToken as string, setToken, invalidateSession);
        })
    };
    fetchContacts();
  }, [invalidateSession, page, refreshToken, setToken, token]);

  return (
    <div
      style={{
        margin: "auto",
        maxWidth: "1440px"
      }}
    >
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
    </div>
  );
}

export default ContactsPage;