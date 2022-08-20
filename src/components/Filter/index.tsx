import "./header.css";

interface Props {
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ filter, setFilter }: Props) => {
  return (
    <div className="filter">
      <input
        className="filter-input"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Find by name"
      />
    </div>
  );
}

export default Filter;