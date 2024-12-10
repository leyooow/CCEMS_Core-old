import axios from 'axios';
import {API_BASE_URL} from '../utils/constants'

const token = localStorage.getItem('token');

const apiClient = axios.create({
  //baseURL: process.env.REACT_APP_API_URL, // Fetches the API URL from the .env file
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

export default apiClient;
