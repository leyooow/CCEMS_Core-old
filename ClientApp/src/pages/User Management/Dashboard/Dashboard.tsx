import React, { useEffect, useState } from "react";
import { Typography, Box, Tooltip, IconButton, TextField, Dialog } from "@mui/material";
import { PagedResult } from "../../../models/GenericResponseDTO";
import userService from "../../../services/userService";
import { FormattedDate } from "../../../utils/formatDate";
import EditNoteTwoTone from "@mui/icons-material/EditNoteTwoTone";
import { globalStyle } from "../../../styles/theme";
import DeleteTwoTone from "@mui/icons-material/DeleteTwoTone";
import Table from "../../../components/Table/Table";
import PaginationControls from "../../../components/Pagination/PaginationControls";
import UserFormModal from "../../../components/Modal/UserFormModal";
import GlobalButton from "../../../components/Button/Button";
import { EmployeeDTO } from "../../../models/employeeMaintenanceDTOs";
import groupService from "../../../services/groupService";
import { BranchAccessDTO, UserCreateDto } from "../../../models/userMaintenanceDTOs";
import { GroupDTO } from "../../../models/groupDTOs";
import { RoleDTO } from "../../../models/RoleDTOs";
import ToastService from "../../../utils/toast";


const Dashboard: React.FC = () => {
  // Define state with proper initial structure
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState<GroupDTO[]>([]);
  const [roleOptions, setRoleOptions] = useState<RoleDTO[]>([]);
  const [branchOptions, setBranchOptions] = useState<GroupDTO[]>([]);
  const [pagedResult, setPagedResult] = useState<PagedResult<EmployeeDTO>>({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
    searchTerm: ''
  });

  const initialFormData: UserCreateDto = {
    userName: "",
    employeeId: "",
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    userRole: 0,
    branchAccess: [],
  };

  // Define form fields, including value, error, and helper text
  const [userFormData, setUserFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState<string>(pagedResult.searchTerm);

  const fetchRolesOptions = async () => {
    try {
      const result = await userService.GetAllRoles();
      setRoleOptions(result.data);
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  };

  const mappedUserFormData = {
    userName: userFormData.userName,
    employeeId: userFormData.employeeId,
    lastName: userFormData.lastName,
    firstName: userFormData.firstName,
    middleName: userFormData.middleName,
    email: userFormData.email,
    roleId: userFormData.userRole,
    branchAccess: userFormData.branchAccess,
  };

  const checkUserAD = async (username: string) => {
    try {
      const result = await userService.checkUserAD(username);
      setBranchOptions(result.data);
    } catch (error) {
      console.error("Error fetching branches", error);
    }
  };

  const fetchBranchOptions = async () => {
    try {
      const result = await groupService.getAllGroups();
      setBranchOptions(result.data);
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle branch changes
  const handleBranchChange = (
    _event: React.ChangeEvent<{}>,
    value: GroupDTO[]
  ) => {
    setSelectedBranches(value);

    const branchAccess: BranchAccessDTO[] = value.map((branch) => ({
      employeeId: userFormData.employeeId,
      branchId: branch.code,
      usersLoginName: userFormData.userName,
    }));

    setUserFormData({ ...userFormData, branchAccess });
  };

  const resetUserFormData = () => {
    setUserFormData(initialFormData);
    setSelectedBranches([]);
  };

  const handleCloseModal = () => {
    resetUserFormData();
    setOpenCreateUserModal(false);
  };

  const handleAddOpenModal = async () => {
    setOpenCreateUserModal(true);
  };

  const fetchUsers = async () => {
    try {
      const result = await userService.getPaginatedUsers(
        pagedResult.pageNumber,
        pagedResult.pageSize,
        searchTerm
      );
      setPagedResult(result.data.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBranchOptions();
    fetchRolesOptions();
  }, [pagedResult.pageNumber, pagedResult.pageSize, searchTerm]);

  const columns = [
    { label: 'Username', accessor: 'loginName' },
    { label: 'Employee ID', accessor: 'employeeId' },
    {
      label: 'Date Created',
      render: (data: any) => (
        FormattedDate(data.createdDate)
      ),
    },
    {
      label: 'Last Log-in',
      render: (data: any) => (
        FormattedDate(data.lastLogIn)
      ),
    },
    {
      label: 'Branches',
      render: (data: any) => (
        data.branchAccesses?.length || 0
      ),
    },
    { label: 'Role', accessor: 'roleName' },
    {
      label: 'Action',
      render: () => (
        <Box sx={globalStyle.buttonBox}>
          <Tooltip title="Edit">
            <IconButton color='primary'>
              <EditNoteTwoTone />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton sx={globalStyle.buttonRed}>
              <DeleteTwoTone />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const pageCount = Math.ceil(pagedResult.totalCount / pagedResult.pageSize);

  const handlePageChange = (newPage: number) => {
    setPagedResult({
      ...pagedResult,
      pageNumber: newPage,
    });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPagedResult({
      ...pagedResult,
      pageNumber: 1,
    });
  };

  const handleSubmitCreateUser = async (e: any) => {
    e.preventDefault();
     console.log("Form Submitted:", mappedUserFormData);
    // console.log("Selected Branch:", selectedBranches);

    try {
      const result = await userService.AddUser(mappedUserFormData);
      console.log(result)

      if (result.success) {
        handleCloseModal();
        fetchUsers()
        ToastService.success(result.data.message);
      } else {
        ToastService.error(result.data.message);
      }
    } catch (error) {
      console.error("Error creating user", error);
      ToastService.error('An error occurred while creating the user.');
    }

    setOpenCreateUserModal(false);
  };

  return (
    <>
      <Typography variant="h6" component="h6" gutterBottom>
        User Dashboard
      </Typography>

      <Box sx={globalStyle.mainBox}>
        <Box sx={{ m: 1 }}>
          <GlobalButton buttonAction="add" buttonName="Add User" onClick={handleAddOpenModal} />
        </Box>

        <Box sx={globalStyle.searchBox}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={globalStyle.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
      </Box>

      <Table columns={columns} data={pagedResult.items} />

      <PaginationControls
        currentPage={pagedResult.pageNumber}
        totalPages={pageCount}
        onPageChange={handlePageChange}
        totalItems={pagedResult.totalCount}
      />

      <Dialog open={openCreateUserModal} onClose={handleCloseModal} maxWidth="lg" fullWidth>
        <UserFormModal
          formData={mappedUserFormData}
          onChange={handleChange}
          onBranchChange={handleBranchChange}
          handleSubmit={handleSubmitCreateUser}
          rolesOptions={roleOptions}
          branchOptions={branchOptions}
          selectedBranches={selectedBranches}
          onCancel={handleCloseModal}
          isEditMode={false}
        />
      </Dialog>
    </>
  );
};

export default Dashboard;