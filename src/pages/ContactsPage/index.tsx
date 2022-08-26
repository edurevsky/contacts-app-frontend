import { useEffect, useState } from "react";
import { findPaginatedContacts, refreshTokenService } from "../../api";
import ContactForm from "../../components/ContactForm";
import Contacts from "../../components/Contacts";
import Container from "../../components/Container";
import Filter from "../../components/Filter";
import Pagination from "../../components/Pagination";
import { useAuth } from "../../contexts/AuthContext";
import { IContact } from "../../interfaces/contact";
import { IPageableContacts } from "../../interfaces/pageable-contacts";
import filterContactName from "../../utils/filter-contact-name";

const ContactsPage = () => {
  const [page, setPage] = useState<number>(0);
  const [pageable, setPageable] = useState<IPageableContacts>();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const { token, refreshToken, setToken, invalidateSession } = useAuth();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<IContact>();
  const [favoriteFilter, setFavoriteFilter] = useState<string>("all");
  
  useEffect(() => {
    const fetchContacts = async () => {
      console.log(token);
      return await findPaginatedContacts(page, token as string)
        .then(res => {
          console.log("ok");
          console.log(res.data);
          setPageable(res.data);
          setContacts(res.data.content);
        })
        .catch(_ => {
          refreshTokenService(refreshToken as string, setToken, invalidateSession);
        })
    };
    fetchContacts();
  }, [invalidateSession, page, refreshToken, setToken, token]);

  function favFilters(s: string): (c: IContact) => boolean {
    switch (s) {
      case 'all':
        return (c) => true;
      case 'fav':
        return (c) => c.favorite;
      case 'unfav':
        return (c) => !c.favorite;
      default:
        return (_) => true;
    }
  }

  return (
    <div style={{ backgroundColor: "#00b1ff" }}>
      <Container style={{ minHeight: "100vh" }}>
        <Filter
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          setFavoriteFilter={setFavoriteFilter}
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
              contacts={contacts.filter(contact => filterContactName(contact, nameFilter)).filter(contact => favFilters(favoriteFilter)(contact))}
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