import React, { useEffect, useState } from "react";
import { Typography, Box, Tooltip, IconButton, TextField, Dialog } from "@mui/material";
import { PagedResult } from "../../../models/groupDTOs";
import userService from "../../../services/userService";
import { FormattedDate } from "../../../utils/formatDate";
import EditNoteTwoTone from "@mui/icons-material/EditNoteTwoTone";
import { globalStyle } from "../../../styles/theme";
import DeleteTwoTone from "@mui/icons-material/DeleteTwoTone";
import Table from "../../../components/Table/Table";
import PaginationControls from "../../../components/Pagination/PaginationControls";
import UserFormModal from "../../../components/Modal/UserFormModal";
import GlobalButton from "../../../components/Button/Button";
const Dashboard: React.FC = () => {
  // Define state with proper initial structure
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [pagedResult, setPagedResult] = useState<PagedResult>({
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

  const roles = ["Admin", "User", "Manager", "Viewer"];
  const branchOptions = [
    "Branch 1",
    "Branch 2",
    "Branch 3",
    "Branch 4",
    "Branch 5",
    "Branch 6",
  ];

  // Define form fields, including value, error, and helper text
  const [createUserFormData, setCreateUserFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState<string>(pagedResult.searchTerm);

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCreateUserFormData({ ...createUserFormData, [name]: value });
  };

  const handleBranchChange = (event: any, value: any) => {
    setCreateUserFormData({ ...createUserFormData, branches: value });
  };

  const hanldeCloseModal = () => {
    setCreateUserFormData(initialFormData)
    setOpenCreateUserModal(false)
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
    fetchUsers();
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
    console.log("Form Submitted:", createUserFormData);
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

      <Dialog open={openCreateUserModal} onClose={() => setOpenCreateUserModal(false)} maxWidth="lg" fullWidth>
        <UserFormModal
          formData={createUserFormData}
          onChange={handleChange}
          onBranchChange={handleBranchChange}
          handleSubmit={handleSubmitCreateUser}
          roles={roles}
          branchOptions={branchOptions}
          onCancel={hanldeCloseModal}
          // isEditMode
        />
      </Dialog>
    </>

  )
};

export default Dashboard;


