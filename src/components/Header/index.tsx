import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/auth-context";
import Container from "../Container";

const Header = () => {
  const { invalidateSession } = useAuth();

  return (
    <header style={{ backgroundColor: '#00a1ff' }}>
      <Container>
        <div style={{ color: "#f4f4f4", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1>Contacts App</h1>
          <Link
            to="/login"
            onClick={() => invalidateSession()}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Logout
          </Link>
        </div>
      </Container>
    </header>
  );
}

export default Header;