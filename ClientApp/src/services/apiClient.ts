import axios from 'axios';

const token = localStorage.getItem('token');

const apiClient = axios.create({
  //baseURL: process.env.REACT_APP_API_URL, // Fetches the API URL from the .env file
  baseURL: 'https://localhost:7192/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

export default apiClient;
