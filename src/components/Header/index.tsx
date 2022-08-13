
interface Props {
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ filter, setFilter }: Props) => {
  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Find by name"
      />
    </div>
  );
}

export default Header;