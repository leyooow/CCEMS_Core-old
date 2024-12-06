import apiClient from './apiClient';

const userService = {
  getUserProfile: async () => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },

  updateUserProfile: async (data: Record<string, any>) => {
    const response = await apiClient.put('/user/profile', data);
    return response.data;
  },
};

export default userService;
