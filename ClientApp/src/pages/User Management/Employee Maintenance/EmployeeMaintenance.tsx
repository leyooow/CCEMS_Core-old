import React, { useEffect, useState } from 'react';
import { PagedResult } from '../../../models/groupDTOs';
import PaginationControls from '../../../components/Pagination/PaginationControls'
import Table from '../../../components/Table/Table';
import { Box, Typography, TextField } from '@mui/material';
import { globalStyle } from '../../../styles/theme';
import EmployeeService from '../../../services/employeeService';
import GlobalButton from '../../../components/Button/Button';
import { EmployeeStyle } from './EmployeeMaintenanceStyle';
import AddDataModal from '../../../components/Modal/FormModal'


const EmployeeMaintenance: React.FC = () => {

  // Define state with proper initial structure
  const [pagedResult, setPagedResult] = useState<PagedResult>({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
    searchTerm: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>(pagedResult.searchTerm);


  const [modalTitle, setModalTitle] = useState('')

  const [openAddModal, setOpenAddModal] = useState(false)


  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    middleName: '',
    lastName: '',
  });
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log('Data saved:', formData);
    setOpenAddModal(false);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true)
    setModalTitle('Add Employee')
  }

  const fetchEmployees = async () => {
    try {
      const result = await EmployeeService.getAllEmployees(
        pagedResult.pageNumber,
        pagedResult.pageSize,
        searchTerm
      );
      setPagedResult(result.data.data);

      // console.log(result); 
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  // UseEffect hook to refetch Employees based on page number, page size, or search term change
  useEffect(() => {
    fetchEmployees();
  }, [pagedResult.pageNumber, pagedResult.pageSize, searchTerm]);

  const columns = [
    { label: 'Employee ID', accessor: 'employeeId' },
    {
      label: 'Full Name',
      render: (data: any) => (
        ` ${data.lastName}, ${data.firstName} ${data.middleName} `
      ),
    },

    // { label: 'Middle Name', accessor: 'middleName' },
    // { label: 'Last Name', accessor: 'lastName' },

    // {
    //   label: 'Action',
    //   render: () => (
    //     <Box sx={globalStyle.buttonBox}>
    //       <Tooltip title="Edit">
    //         <IconButton color='primary' onClick={handleOpenEditModal}>
    //           <EditNoteTwoTone />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="Delete">
    //         <IconButton sx={globalStyle.buttonRed} onClick={handleOpenDeleteModal}>
    //           <DeleteTwoTone />
    //         </IconButton>
    //       </Tooltip>
    //     </Box>
    //   ),
    // },
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

  return (
    <>
      <Typography variant="h6" component="h6" gutterBottom>
        Employee Maintenance
      </Typography>
      <Box sx={globalStyle.mainBox}>

        <Box sx={EmployeeStyle.btnBox}>
          <GlobalButton buttonAction="add" buttonName="Add Employee" onClick={handleOpenAddModal} />
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


      <AddDataModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        title={modalTitle}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />

    </>
  );
};

export default EmployeeMaintenance;
2