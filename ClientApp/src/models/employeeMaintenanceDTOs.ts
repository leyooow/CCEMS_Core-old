
export interface EmployeeDTO {
  employeeId: string;
  firstname: string;
  middleName: string;
  lastName: string;
}

export interface EmployeeCreateDTO {
  employeeId: string | string[];
  firstName: string | string[];
  middleName: string | string[];
  lastName: string | string[];

}

export interface EmployeeUpdateDTO {
  id: number;
  name: string;

}
