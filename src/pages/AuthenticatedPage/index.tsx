import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/AuthContext/auth-context";

const AppPage = () => {
  const { token, refreshToken } = useContext(AuthContext);

  return (
    <>
      {(token && refreshToken) !== null ? (
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