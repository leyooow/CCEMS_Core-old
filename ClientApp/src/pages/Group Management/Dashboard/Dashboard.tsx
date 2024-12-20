import React, { useEffect, useState } from 'react';
import GroupService from '../../../services/groupService';
import { GroupCreateDTO, PagedResult } from '../../../models/groupDTOs';
import PaginationControls from '../../../components/Pagination/PaginationControls'
import Table from '../../../components/Table/Table';
import { Box, Typography, TextField, IconButton, Tooltip } from '@mui/material';
import EditNoteTwoTone from '@mui/icons-material/EditNoteTwoTone';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import { FormattedDate } from '../../../utils/formatDate';
import { globalStyle } from '../../../styles/theme';
import GlobalButton from '../../../components/Button/Button';
import GroupFormModal from '../../../components/Modal/GroupFormModal';
 
const GroupList: React.FC = () => {
<<<<<<< Updated upstream
 
 
=======

>>>>>>> Stashed changes
  // Define state with proper initial structure
  const [pagedResult, setPagedResult] = useState<PagedResult>({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
    searchTerm: ''
  });
 
  const [modalTitle, setModalTitle] = useState('')
  const [openAddModal, setOpenAddModal] = useState(false)
  const [formData, setFormData] = useState<GroupCreateDTO>({
    code: '',
    name: '',
    area: '',
    division: '',
  });
<<<<<<< Updated upstream
 
 
  const [branchOptions, setBranchOptions] = useState<BranchOption[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<BranchOption | null>(null);
  const fetchBranchCodes = async (searchTerm = '', pageNumber = 1, pageSize = 10) => {
    try {
      const response = await GroupService.getBranchCodes(pageNumber, pageSize, searchTerm);
      setBranchOptions(response.items); // Assuming API returns { items: [...] }
    } catch (error) {
      console.error('Error fetching branch codes', error);
    }
  };
 
 
  const handleBranchSearch = (event: React.ChangeEvent<{}>, value: string) => {
    fetchBranchCodes(value, 1, 10);
  };
 
=======

>>>>>>> Stashed changes
  const [searchTerm, setSearchTerm] = useState<string>(pagedResult.searchTerm);
 
  const fetchGroups = async () => {
    try {
      const result = await GroupService.getAllGroups(
        pagedResult.pageNumber,
        pagedResult.pageSize,
        searchTerm
      );
      setPagedResult(result.data.data);
<<<<<<< Updated upstream
 
      // console.log(result);
=======
>>>>>>> Stashed changes
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };
 
  // UseEffect hook to refetch groups based on page number, page size, or search term change
  useEffect(() => {
    fetchGroups();
  }, [pagedResult.pageNumber, pagedResult.pageSize, searchTerm]);
 
  const columns = [
    { label: 'Branch Code', accessor: 'code' },
    { label: 'Branch Name', accessor: 'name' },
    { label: 'Description', accessor: 'description' },
    {
      label: 'Date Created',
      render: (data: any) => (
        FormattedDate(data.dateCreated)
      ),
    },
    {
      label: 'Date Modified',
      render: (data: any) => (
        FormattedDate(data.dateModified)
      ),
    },
    { label: 'Area', accessor: 'area' },
    { label: 'Division', accessor: 'division' },
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
    setPagedResult({
      ...pagedResult,
      pageNumber: 1,
      searchTerm: e.target.value,
    });
  };
 
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
    setModalTitle('Add Group');
  };
 
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setFormData({ code: '', name: '', area: '', division: '' });
  };
 
  const handleSave = () => {
    console.log('Data saved:', formData);
    handleCloseAddModal();
  };
 
  return (
    <>
<<<<<<< Updated upstream
 
 
=======
>>>>>>> Stashed changes
      <Typography variant="h6" component="h6" gutterBottom>
        Groups
      </Typography>
 
      <Box sx={globalStyle.mainBox}>
        <Box sx={{ m: 1 }}>
          <GlobalButton buttonAction="add" buttonName="Add Group" onClick={handleOpenAddModal} />
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
 
      <GroupFormModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        title={modalTitle}
        formData={formData}
        handleSave={handleSave}
        setFormData={setFormData}
      />
    </>
<<<<<<< Updated upstream
 
  );
};
 
=======
  );
};

>>>>>>> Stashed changes
export default GroupList;