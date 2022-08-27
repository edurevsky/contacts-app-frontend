import axios, { AxiosResponse } from "axios";
import { NewContactRequest } from "../interfaces/new-contact-request";
import { UpdateContactRequest } from "../interfaces/update-contact-request";

const base = 'http://localhost:8080';

export const contactsService = axios.create({
  baseURL: `${base}/contacts`
});

export const loginService = axios.create({
  baseURL: `${base}/login`
});

export const findPaginatedContacts = (page: number, token: string) => {
  return contactsService.get(`?page=${page}&size=15`, { headers: { 'Authorization': token }});
}

export const saveContact = (request: NewContactRequest, token: string) => {
  return contactsService.post('', request, { headers: { 'Authorization': token } });
}

export const updateContact = (request: UpdateContactRequest, token: string) => {
  return contactsService.put('', request, { headers: { 'Authorization': token } });
}

export const deleteContact = (id: number, token: string) => {
  return contactsService.delete(`${id}`, { headers: { 'Authorization': token } });
}

export const favoriteContact = (id: number, token: string) => {
  return contactsService.put(`/favorite/${id}`, {}, { headers: { 'Authorization': token } });
}

export const refreshTokenService = async (
  refreshToken: string,
  setToken: (value: string) => void,
  invalidateSession: () => void,
  onSuccess?: () => void
) => {
  return await axios.get(`${base}/refreshToken`, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  })
    .then((res: AxiosResponse) => {
      console.log("refreshing token");
      setToken(res.headers.authorization);
    })
    .catch(_ => {
      invalidateSession();
    })
    .finally(() => {
      if (onSuccess) {
        onSuccess();
      }
    });
}