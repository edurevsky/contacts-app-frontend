import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/auth-context";

const AppPage = () => {
  const { token, refreshToken } = useContext(AuthContext);

  return (
    <>
      {(token && refreshToken) !== null ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default AppPage;