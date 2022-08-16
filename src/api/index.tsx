import axios from "axios";

const base = 'http://localhost:8080';

export const contactsService = axios.create({
  baseURL: `${base}/contacts`
});

export const loginService = axios.create({
  baseURL: `${base}/login`
});