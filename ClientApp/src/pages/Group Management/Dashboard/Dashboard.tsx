import React, { useEffect, useState } from 'react';
import GroupService from '../../../services/groupService';
import { PagedResult } from '../../../models/gruopDTOs';
import PaginationControls from '../../../components/Pagination/PaginationControls'
import Table from '../../../components/Table/Table';
import { Box, Typography, TextField, IconButton, Tooltip } from '@mui/material';
import EditNoteTwoTone from '@mui/icons-material/EditNoteTwoTone';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';

const GroupList: React.FC = () => {

  // Define state with proper initial structure
  const [pagedResult, setPagedResult] = useState<PagedResult>({
    items: [], 
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10, 
    searchTerm: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>(pagedResult.searchTerm);

  const fetchGroups = async () => {
    try {
      const result = await GroupService.getAllGroups(
        pagedResult.pageNumber, 
        pagedResult.pageSize, 
        searchTerm
      );
      setPagedResult(result);
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
    { label: 'Date Created', accessor: 'dateCreated' },
    { label: 'Date Modified', accessor: 'dateModified' },
    // { label: 'Created By', accessor: 'createdBy' },
    { label: 'Area', accessor: 'area' },
    { label: 'Division', accessor: 'division' },
    {
      label: 'Action',
      render: () => (
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Edit">
            <IconButton color='primary'>
              <EditNoteTwoTone />
            </IconButton> 
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton sx={{color: 'red'}}>
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
  };

  // const handleSearchSubmit = () => {
  //   setPagedResult({
  //     ...pagedResult,
  //     searchTerm: searchTerm, // Update search term in pagedResult
  //     pageNumber: 1, // Reset to first page when search is triggered
  //   });
  // };

  return (
    <>
      <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="h6" gutterBottom>
          Groups
        </Typography>

        {/* Search input box with spacing */}
        <Box sx={{ display: 'flex', gap: .5, alignItems: 'center', marginBottom: 2 }}>
          {/* Search Input */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{ flex: 1 }} // Make the input box flexible
            value={searchTerm}  // Controlled input
            onChange={handleSearchChange}  // Update search term as user types
          />

          {/* Search Button */}
          {/* <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleSearchSubmit}  // Trigger search when clicked
          >
            Search
          </Button> */}
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
    </>
  );
};

export default GroupList;
