// src/models/groupDTOs.ts

export interface GroupDTO {
  id: number;
  code?: string;
  name: string;
  description?: string;
  dateCreated: Date;
  dateModified?: Date | null;
  createdBy?: string;
  area?: string;
  division?: string;
}

export interface PagedResult {
  items: GroupDTO[];    // Array of GroupDTO (list of groups)
  totalCount: number;   // Total number of groups
  pageNumber: number;   // Current page number
  pageSize: number;     // Number of groups per page
  searchTerm: string;   // Search term used (if any)
}

export interface GroupCreateDTO {
  name: string;
  // Other properties for creating a group
}

export interface GroupUpdateDTO {
  id: number;
  name: string;
  // Other properties for updating a group
}
