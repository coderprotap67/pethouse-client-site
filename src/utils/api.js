import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pethouse-server-site.vercel.app/api', 
  withCredentials: true,
});

export default api;