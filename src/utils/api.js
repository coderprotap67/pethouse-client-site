import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pet-server-site.vercel.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;