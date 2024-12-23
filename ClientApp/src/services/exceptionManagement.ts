import apiClient from './apiClient';

const ExceptionManagement = {
    async getExceptionsList(pageNumber: number = 1, pageSize: number = 10, searchTerm: string = '', status: number = 1) {
        try {
          const response = await apiClient.get('/ExceptionsMgmt/GetExceptionsList', {
            params: {
              pageNumber,
              pageSize, 
              searchTerm,
              status
            },
          });
          return response;
        } catch (error) {
          throw error;
        }
    },
    async getExceptionDetails(id: string = '') {
      try {
        const response = await apiClient.get('/ExceptionsMgmt/GetExceptionDetails', {
          params: {
            id
          },
        });
        return response;
      } catch (error) {
        throw error;
      }
  },
    
}

export default ExceptionManagement;