import { IContact } from "./contact";

export interface IPageableContacts {
  content: IContact[],
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
  },
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  numberOfElements: number,
  first: boolean,
  empty: boolean
}