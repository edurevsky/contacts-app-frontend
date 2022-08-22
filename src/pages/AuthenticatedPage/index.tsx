import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext/auth-context";

const AppPage = () => {
  const { token, refreshToken } = useAuth();

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