// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pet-server-site.vercel.app/api', 
  withCredentials: true, 
});

export default api;