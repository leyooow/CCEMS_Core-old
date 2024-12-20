// src/services/groupService.ts

import apiClient from "./apiClient"; // Assuming apiClient.ts handles base configurations like axios instance
import {
  GroupCreateDTO,
  GroupUpdateDTO,
  PagedResult,
} from "../models/groupDTOs"; // Update with actual DTO paths

const GroupService = {
  async getAllGroups() {
    try {
      const response = await apiClient.get("/Groups/GetAllGroups");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getPaginatedGroups(
    pageNumber: number = 1,
    pageSize: number = 10,
    searchTerm: string = ""
  ) {
    try {
      const response = await apiClient.get("/groups/GetPaginatedGroups", {
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

  async getPaginatedAllGroups(
    pageNumber: number = 1,
    pageSize: number = 10,
    searchTerm: string = ""
  ) {
    try {
      const response = await apiClient.get("/groups/GetPaginatedGroups", {
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

  async createGroup(groupCreateDto: GroupCreateDTO) {
    try {
      await apiClient.post("/groups/CreateGroup", groupCreateDto);
    } catch (error) {
      throw error;
    }
  },

  async updateGroup(id: number, groupUpdateDto: GroupUpdateDTO) {
    try {
      await apiClient.put(`/groups/UpdateGroup/${id}`, groupUpdateDto);
    } catch (error) {
      throw error;
    }
  },

  async deleteGroup(id: number) {
    try {
      await apiClient.delete(`/groups/DeleteGroup/${id}`);
    } catch (error) {
      throw error;
    }
  },

  async getBranchCodes(
    pageNumber: number = 1,
    pageSize: number = 10,
    searchTerm: string = ""
  ) {
    try {
      const response = await apiClient.get(
        "/BranchCode/GetPaginatedBranchCodes",
        {
          params: {
            pageNumber,
            pageSize,
            searchTerm,
          },
        }
      );

      if (response.data.success) {
        return response.data.data;
      }

      throw new Error(response.data.message || "Failed to fetch branch codes.");
    } catch (error) {
      throw error;
    }
  },
};

export default GroupService;