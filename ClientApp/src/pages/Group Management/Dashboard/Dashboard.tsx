import React, { useEffect, useState } from 'react';
import GroupService from '../../../services/groupService';
import { BranchOption, GroupCreateDTO, PagedResult } from '../../../models/groupDTOs';
import PaginationControls from '../../../components/Pagination/PaginationControls'
import Table from '../../../components/Table/Table';
import { Box, Typography, TextField, IconButton, Tooltip, Autocomplete } from '@mui/material';
import EditNoteTwoTone from '@mui/icons-material/EditNoteTwoTone';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import { FormattedDate } from '../../../utils/formatDate';
import { globalStyle } from '../../../styles/theme';
import FormDataModal from '../../../components/Modal/FormModal';
import CustomModal from '../../../components/Modal/ConfirmationModal';
import { ERROR_MESSAGES } from '../../../utils/constants';
import { FormData } from '../../../models/formDTOs';
import GlobalButton from '../../../components/Button/Button';
import GroupFormModal from '../../../components/Modal/GroupFormModal';
 
const GroupList: React.FC = () => {
 
 
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
 
  const [searchTerm, setSearchTerm] = useState<string>(pagedResult.searchTerm);
 
  const fetchGroups = async () => {
    try {
      const result = await GroupService.getAllGroups(
        pagedResult.pageNumber,
        pagedResult.pageSize,
        searchTerm
      );
      setPagedResult(result.data.data);
 
      // console.log(result);
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
      label: 'Date Modifiedd',
      render: (data: any) => (
        FormattedDate(data.dateModified)
      ),
    },
    // { label: 'Created By', accessor: 'createdBy' },
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
    pagedResult.pageNumber = 1;
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
 
  );
};
 
export default GroupList;