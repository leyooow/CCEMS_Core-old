import apiClient from './apiClient';

const ExceptionManagement = {
    async getExceptionsList(pageNumber: number = 1, pageSize: number = 10, searchString: string = '', status: number = 1) {
        try {
          const response = await apiClient.get('/ExceptionsMgmt/GetExceptionsList', {
            params: {
              pageNumber,
              pageSize, 
              searchString,
              status
            },
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
    
}

export default ExceptionManagement;