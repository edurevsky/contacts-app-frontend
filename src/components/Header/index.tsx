import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/auth-context";
import "./header.css";

interface Props {
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ filter, setFilter }: Props) => {
  const { deleteToken } = useContext(AuthContext);

  const performLogout = (e: React.FormEvent<HTMLFormElement>) => {
    deleteToken();
  }

  return (
    <div className="header">
      <input
        className="filter"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Find by name"
      />
      <form onSubmit={performLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}

export default Header;