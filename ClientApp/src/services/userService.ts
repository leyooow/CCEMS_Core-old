import apiClient from './apiClient';

const userService = {

  async getPaginatedUsers(pageNumber: number = 1, pageSize: number = 10, searchTerm: string = '') {
    try {
      const response = await apiClient.get('/User/GetPaginatedUsers', {
        params: {
          pageNumber,
          pageSize, 
          searchTerm,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
    
  async GetAllRoles() {
      const response = await apiClient.get('/User/GetAllRoles', {
      });
      return response.data;
  },



};

export default userService;
