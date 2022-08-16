import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/auth-context";
import ContactsPage from "../ContactsPage";
import LoginPage from "../LoginPage";

const AppPage = () => {
  const { token } = useContext(AuthContext);
  return (
    <>
      {token !== null ? (
        <ContactsPage />
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default AppPage;