import { useEffect, useState } from "react";
import { contactsService, refreshTokenService } from "../../api";
import ContactForm from "../../components/ContactForm";
import Contacts from "../../components/Contacts";
import Container from "../../components/Container";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { useAuth } from "../../contexts/AuthContext/auth-context";
import { IContact } from "../../interfaces/contact";
import { IPageableContacts } from "../../interfaces/pageable-contacts";
import filterContactName from "../../utils/filter-contact-name";

const ContactsPage = () => {
  const [page, setPage] = useState<number>(0);
  const [pageable, setPageable] = useState<IPageableContacts>();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filter, setFilter] = useState<string>("");
  const { token, refreshToken, setToken, invalidateSession } = useAuth();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<IContact>();

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
    <div style={{ backgroundColor: "#00b1ff" }}>
      <Container style={{ minHeight: "100vh" }}>
        <Filter
          filter={filter}
          setFilter={setFilter}
        />
        <ContactForm
          openModal={openModal}
          setOpenModal={setOpenModal}
          selected={selected}
          setContacts={setContacts}
          setSelected={setSelected}
        />
        {pageable && (
          <>
            <Contacts
              contacts={contacts.filter(contact => filterContactName(contact, filter))}
              setContacts={setContacts}
              setSelected={setSelected}
              setOpenModal={setOpenModal}
            />
            <Pagination pageable={pageable} setPage={setPage} />
          </>
        )}
      </Container>
    </div>
  );
}

export default ContactsPage;