// src/services/EmployeeService.ts

import apiClient from './apiClient'; // Assuming apiClient.ts handles base configurations like axios instance
import { DownloadAdhocViewModel } from '../models/reportDTO'; // Update with actual DTO paths

const ReportService = {
  async getlist(searchString: string = '',Page: number = 1) {
    try {
      const response = await apiClient.get('/Report/GetList', {
        params: {
          searchString,
          Page
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  async downloadAdhoc(vm: DownloadAdhocViewModel) {
    try {
      const response = await apiClient.post('/Report/DownloadAdhoc', {
        ...vm
      });
      var result = response.data;
      if (result.success) {
        const fileData = result.data;

        // Check if fileData is valid
        if (!fileData || !fileData.fileByte || fileData.fileByte.length === 0) {
            console.error('File byte data is empty or invalid');
            return;
        }

        // Decode base64 string to byte array
        const byteCharacters = atob(fileData.fileByte);
        const byteArray = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
        }

        // Create a Blob object from the byte array
        const blob = new Blob([byteArray], { type: fileData.contentType });

        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileData.fileName;
        // Programmatically click the link to trigger the download
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
      } else {
          console.log('Download failed:', result.message);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ReportService;
