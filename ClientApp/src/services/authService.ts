import apiClient from './apiClient';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  isAuthenticated: string;
  message : string;
  token: string;
}

const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token'); // Clear token on logout  
  },
};

export default authService;
