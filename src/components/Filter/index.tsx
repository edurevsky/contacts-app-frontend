import "./index.css";

interface Props {
  nameFilter: string,
  setNameFilter: React.Dispatch<React.SetStateAction<string>>,
  setFavoriteFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ nameFilter, setNameFilter, setFavoriteFilter }: Props) => {
  return (
    <>
      <div className="filter">
        <div className="filter-wrapper">
          <input
            className="filter-input"
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Find by name"
          />
          <select
            className="filter-select"
            onChange={(e) => setFavoriteFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="fav">Favorites</option>
            <option value="unfav">Not Favorites</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Filter;