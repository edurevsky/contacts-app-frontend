import { IPageableContacts } from "../../interfaces/pageable-contacts";

interface Props {
  pageable: IPageableContacts,
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ pageable, setPage }: Props) => {
  const { totalPages, numberOfElements, totalElements, last, first } = pageable
  const pageNumber = pageable.pageable.pageNumber + 1
  return (
    <div>
      {!first && (
        <div>
          <button onClick={() => setPage(value => value - 1)}>Previous Page</button>
        </div>
      )}
      <div>
        <span>Showing {numberOfElements} of {totalElements} Contacts</span>
      </div>
      <div>
        <span>page {pageNumber} of {totalPages}</span>
      </div>
      {!last && (
        <div>
          <button onClick={() => setPage(value => value + 1)}>Next Page</button>
        </div>
      )}
    </div>
  );
}

export default Pagination;