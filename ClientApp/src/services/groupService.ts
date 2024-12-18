
import apiClient from './apiClient';

const groupService = {

  async getAllGroups() {
    try {
      const response = await apiClient.get('/groups/GetAllGroups'); 
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  async getPaginatedAllGroups(pageNumber: number = 1, pageSize: number = 10, searchTerm: string = '') {
    try {
      const response = await apiClient.get('/groups/GetPaginatedGroups', {
        params: {
          pageNumber,
          pageSize, 
          searchTerm,
        },
      }); 
      return response.data;
    } catch (error) {
      throw error;
    }
  },

 

};

export default groupService;
