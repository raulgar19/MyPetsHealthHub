import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/MyPetsHealthHubAPI',
  timeout: 10000,
});

export default api;