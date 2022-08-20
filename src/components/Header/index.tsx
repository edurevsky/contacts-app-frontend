import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/auth-context";
import Button from "../Button";
import Container from "../Container";

const Header = () => {
  const { invalidateSession } = useContext(AuthContext);

  return (
    <header style={{ backgroundColor: '#00a1ff' }}>
      <Container>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ color: "#f4f4f4" }}>Contacts App</h1>
          <Button onClick={() => invalidateSession()}>Logout</Button>
        </div>
      </Container>
    </header>
  );
}

export default Header;