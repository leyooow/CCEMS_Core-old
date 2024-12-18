  export interface UserDTO {
    employeeId: string;
    firstname: string;
    middleName: string;
    lastName: string;
  }

  export interface BranchOption {
    code: number;
    name: string;
    // Add other properties as needed
  }
  
  export interface RoleOption {
    id: number;
    roleName: string;
  }