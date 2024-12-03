// src/services/apiClient.ts

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7192/api', // Update with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
