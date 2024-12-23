import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Table from '../../../components/Table/Table';


import ExceptionManagement from '../../../services/exceptionManagement';
import { PagedResult } from '../../../models/GenericResponseDTO';
import { ExceptionDTO } from '../../../models/exceptionManagementDTOs';
import { globalStyle } from '../../../styles/theme';
import { Badge, Box, Button, IconButton, MenuItem, TextField, Tooltip, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import PaginationControls from '../../../components/Pagination/PaginationControls';
import GlobalButton from '../../../components/Button/Button';

// Define the styled badge
const RedBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

const GreenBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
}));

const BlueBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));
const Dashboard = () =>  {

  const navigate = useNavigate();
  const [pagedResult, setPagedResult] = useState<PagedResult<ExceptionDTO>>({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
    searchTerm: ''
  });
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>(pagedResult.searchTerm);
  const [status, setStatus] = useState<number>(1);
  const statusOptions = [
    { label: "All", value: 1},
    { label: "For Approval", value: 2 },
    { label: "Open", value: 3 },
    { label: "Closed", value: 4 },
  ];
  const columns = [
    {
      label: 'Action',
      render: (e: ExceptionDTO) => <GlobalButton buttonAction="view" onClick={() => onClickViewDetails(e.refNo)}>View Details</GlobalButton>
    },
    { label: 'Status', accessor: 'status',
      render: (rowData:any) => {
        switch (rowData.status) {
          case 1:
            return <BlueBadge color='primary'>Pending</BlueBadge>;
          case 2:
            return <GreenBadge color='success'>Approved</GreenBadge>;
          case 3:
            return <RedBadge color='error'>Rejected</RedBadge>;
          default:
            return <Badge>Unknown</Badge>;
        }
      }
    },
    { label: 'Reference No.', accessor: 'refNo' },
    { label: 'Branch Code/ Name', accessor: 'branchName' },
    { label: 'Transaction Type', accessor: 'type' },
    { label: 'Transaction Date', accessor: 'transactionDate' },
    { label: 'Aging Category', accessor: 'agingCategory' },
    { label: 'Created By', accessor: 'createdBy' },
    //{ label: 'Deviation Count	', accessor: 'employeeId' },
    { label: 'Date Created', accessor: 'dateCreated' },
    { label: 'Employee ID', accessor: 'employeeID' },
    { label: 'Employee Responsible', accessor: 'personResponsible' },
  ];

  useEffect(() => {
    getExceptionsList();
  }, [pagedResult.pageNumber, pagedResult.pageSize, searchTerm, status]);

  const getExceptionsList = async() => {
    try {
      const result = await ExceptionManagement.getExceptionsList(
        pagedResult.pageNumber,
        pagedResult.pageSize,
        searchTerm,
        status
      );
      setPagedResult(result.data.data);
      setPageCount(Math.ceil(pagedResult.totalCount / pagedResult.pageSize));
      console.log(result)
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  }

  const handlePageChange = (newPage: number) => {
    setPagedResult({
      ...pagedResult,
      pageNumber: newPage,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    pagedResult.pageNumber = 1;
  };

  const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(parseInt(e.target.value));
  };

  const onClickViewDetails = (refNo: string) => {
    navigate(`/ExceptionsManagement/Details/${refNo}`)
  }

  const onClickAddException = () => {
    navigate("/AddException")
  }

  return (
    <>
      <Typography variant="h6" component="h6" gutterBottom>
        Exceptions Dashboard
      </Typography>

      <Box sx={globalStyle.mainBox}>
        <Box sx={{ m: 1 }}>
          <GlobalButton buttonAction="add" buttonName="Add Exception" onClick={() => onClickAddException()} />
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
      <Box style={{ width: 150, marginBottom: 5}}>
        <TextField
          select
          label="Status"
          variant="outlined"
          fullWidth
          name="userRole"
          //value={formData.userRole}
          onChange={onChangeStatus}
          required
        >
          {statusOptions.map((x, index) => (
            <MenuItem key={index} value={x.value}>
              {x.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

     <Table columns={columns} data={pagedResult.items} />

     <PaginationControls
        currentPage={pagedResult.pageNumber}
        totalPages={pageCount}
        onPageChange={handlePageChange}
        totalItems={pagedResult.totalCount}
      />
    </>
  )
}

export default Dashboard