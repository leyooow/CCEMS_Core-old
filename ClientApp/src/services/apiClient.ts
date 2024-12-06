import axios from 'axios';
const gtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbXBsb3llZUlEIjoiMjAxOTAxNTciLCJMb2dpbk5hbWUiOiJSRVNpbWJ1bGFuIiwiTmFtZSI6IlJlbiBSZW4gU2ltYnVsYW4iLCJSb2xlIjoiQWRtaW5pc3RyYXRvciIsIkxvZ2luRGF0ZVRpbWUiOiIxMDoyNiBBTSIsImV4cCI6MTczMzQ1NTU2MCwiaXNzIjoiQ0NFTVNOQU1BTFVQSVQiLCJhdWQiOiJCT0NQRU9QTEUifQ.rvpBkqX1Jtih7TxnkI_Pe6UB3TayUt0mjmJn5RWBtTI";
const token = localStorage.getItem('token');

const apiClient = axios.create({
  //baseURL: process.env.REACT_APP_API_URL, // Fetches the API URL from the .env file
  baseURL: 'https://localhost:7192/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${gtoken}`,
  },
});

export default apiClient;
