
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