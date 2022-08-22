import axios, { AxiosResponse } from "axios";

const base = 'http://localhost:8080';

export const contactsService = axios.create({
  baseURL: `${base}/contacts`
});

export const loginService = axios.create({
  baseURL: `${base}/login`
});

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