// src/services/groupService.ts

import apiClient from './apiClient'; // Assuming apiClient.ts handles base configurations like axios instance
import { GroupCreateDTO, GroupUpdateDTO, PagedResult } from '../models/gruopDTOs'; // Update with actual DTO paths

const GroupService = {
  async getAllGroups(pageNumber: number = 1, pageSize: number = 10, searchTerm: string = '') {
    try {
      const response = await apiClient.get('/groups/GetAllGroups', {
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

  async getGroupById(id: number): Promise<PagedResult> {
    try {
      const response = await apiClient.get(`/groups/GetGroupById/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createGroup(groupCreateDto: GroupCreateDTO): Promise<void> {
    try {
      await apiClient.post('/groups/CreateGroup', groupCreateDto);
    } catch (error) {
      throw error;
    }
  },

  async updateGroup(id: number, groupUpdateDto: GroupUpdateDTO): Promise<void> {
    try {
      await apiClient.put(`/groups/UpdateGroup/${id}`, groupUpdateDto);
    } catch (error) {
      throw error;
    }
  },

  async deleteGroup(id: number): Promise<void> {
    try {
      await apiClient.delete(`/groups/DeleteGroup/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default GroupService;
