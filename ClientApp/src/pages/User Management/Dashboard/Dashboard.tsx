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
import { BranchOption, RoleOption } from "../../../models/userMaintenanceDTOs";

const Dashboard: React.FC = () => {
  // Define state with proper initial structure
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [roleOptions, setroleOptions] = useState<RoleOption[]>([]);
  const [branchOptions, setBranchOptions] = useState<BranchOption[]>([]);
  const [pagedResult, setPagedResult] = useState<PagedResult<EmployeeDTO>>({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
    searchTerm: ''
  });

  const initialFormData = {
    username: '',
    employeeId: '',
    lastName: '',
    firstName: '',
    middleInitial: '',
    email: '',
    userRole: '',
    branches: [],
  };

  // Define form fields, including value, error, and helper text
  const [aUserFormData, setaUserFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState<string>(pagedResult.searchTerm);
  const transformedBranches = branchOptions.map(branch => branch.name);
  const transformedRoles = roleOptions.map(role => role.roleName);
  const fetchRolesOptions = async () => {
    try {
      console.log('fetching roles')
      const result = await userService.GetAllRoles();
      console.log(result.data)
      setroleOptions(result.data);

      // console.log(result); 
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  const fetchBranchOptions = async () => {
    try {

      console.log('fetching branches')
      const result = await groupService.getAllGroups();
      console.log(result.data)
      setBranchOptions(result.data);

      // console.log(result); 
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };
  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setaUserFormData({ ...aUserFormData, [name]: value });
  };

  const handleBranchChange = (_event: any, value: any) => {
    setaUserFormData({ ...aUserFormData, branches: value });
  };

  const hanldeCloseModal = () => {
    setaUserFormData(initialFormData)
    setOpenCreateUserModal(false)
  }

  const hanldeAddOpenModal = async  () => {
    await fetchBranchOptions()
    await fetchRolesOptions()
    console.log('add modal opened')
    setOpenCreateUserModal(true)
  }

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
    fetchUsers()
    fetchBranchOptions()
    fetchRolesOptions()
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
            <IconButton color='primary' >
              <EditNoteTwoTone />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton sx={globalStyle.buttonRed} >
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
    pagedResult.pageNumber = 1;
  };


  const handleSubmitCreateUser = (e: any) => {
    e.preventDefault();
    console.log("Form Submitted:", aUserFormData);
    setOpenCreateUserModal(false);
  };

  return (
    <>

      <Typography variant="h6" component="h6" gutterBottom>
        User Dashboard
      </Typography>


      <Box sx={globalStyle.mainBox}>
        <Box sx={{ m: 1 }}>
          <GlobalButton buttonAction="add" buttonName="Add User" onClick={() => setOpenCreateUserModal(true)} />
        </Box>

        {/* Search input box with spacing */}
        <Box sx={globalStyle.searchBox}>
          {/* Search Input */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={globalStyle.searchInput} // Make the input box flexible
            value={searchTerm}  // Controlled input
            onChange={handleSearchChange}  // Update search term as user types
          />
        </Box>
      </Box>

      {/* Table wrapped inside a responsive container */}
      <Table columns={columns} data={pagedResult.items} />

      {/* Pagination Controls Component */}
      <PaginationControls
        currentPage={pagedResult.pageNumber}
        totalPages={pageCount}
        onPageChange={handlePageChange}
        totalItems={pagedResult.totalCount}
      />

      <Dialog open={openCreateUserModal} onClose={hanldeAddOpenModal} maxWidth="lg" fullWidth>
        <UserFormModal
          formData={aUserFormData}
          onChange={handleChange}
          onBranchChange={handleBranchChange}
          handleSubmit={handleSubmitCreateUser}
          roles={transformedRoles}
          branchOptions={transformedBranches}
          onCancel={hanldeCloseModal}
        />
      </Dialog>



      {/* <Dialog open={openCreateUserModal} onClose={() => setOpenCreateUserModal(false)} maxWidth="lg" fullWidth>
        <UserFormModal
          formData={aUserFormData}
          onChange={handleChange}
          onBranchChange={handleBranchChange}
          handleSubmit={handleSubmitCreateUser}
          roles={roles}
          branchOptions={branchOptions}
          onCancel={hanldeCloseModal}
          isEditMode
        />
      </Dialog> */}
    </>

  )
};

export default Dashboard;


