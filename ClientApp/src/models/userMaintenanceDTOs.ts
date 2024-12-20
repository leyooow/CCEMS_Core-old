export interface UserDTO {
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
}
export interface BranchAccessDTO {
  employeeId: string;
  branchId: number;
  usersLoginName: string;
}

export interface UserCreateDto {
  userName: string;
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  userRole: number;
  branchAccess: BranchAccessDTO[];
}

