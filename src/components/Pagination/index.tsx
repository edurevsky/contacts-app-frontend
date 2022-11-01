import { IPageableContacts } from "../../interfaces/pageable-contacts";

interface Props {
  pageable: IPageableContacts,
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ pageable, setPage }: Props) => {
  const { totalPages, last, first } = pageable
  const pageNumber = pageable.pageable.pageNumber + 1
  if (totalPages === 0) {
    return null;
  }
  const getVisibility = (x: boolean) => x ? 'hidden' : 'visible';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <button 
          style={{ visibility: getVisibility(first) }} 
          onClick={() => setPage(value => value - 1)}
        >
          Previous Page
        </button>
      </div>
      <div>
        <span>Page {pageNumber} of {totalPages}</span>
      </div>
      <div>
        <button 
          style={{ visibility: getVisibility(last) }}
          onClick={() => setPage(value => value + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Pagination;