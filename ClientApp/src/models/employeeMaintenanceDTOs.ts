export interface EmployeeDTO {
  employeeId: string;
  firstname: string;
  middleName: string;
  lastName: string;
}

export interface PagedResult {
  items: EmployeeDTO[];    
  totalCount: number;   
  pageNumber: number;   
  pageSize: number;     
  searchTerm: string;   
}

export interface EmployeeCreateDTO {
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  
}

export interface EmployeeUpdateDTO {
  id: number;
  name: string;
  
}
