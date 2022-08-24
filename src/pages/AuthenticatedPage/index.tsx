import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";

const AppPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated() ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default AppPage;