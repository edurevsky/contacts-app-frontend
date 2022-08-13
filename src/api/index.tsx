import axios from "axios";

const contactsService = axios.create({
  baseURL: 'http://localhost:8080/contacts'
});

export default contactsService;