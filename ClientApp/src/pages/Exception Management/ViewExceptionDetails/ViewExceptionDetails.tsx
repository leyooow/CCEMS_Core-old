import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid
} from '@mui/material';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ExceptionManagement from '../../../services/exceptionManagement';
import { SubExceptionsListViewDTO } from '../../../models/exceptionManagementDTOs';
import Table from '../../../components/Table/Table';
import { PagedResult } from '../../../models/GenericResponseDTO';

const ViewExceptionDetails = () => {
  const { refNo } = useParams<{ refNo: string }>();
  const [formValues, setFormValues] = useState({
    employeeId: '',
    exceptionReference: '',
    branchName: '',
    branchCode: '',
    division: '',
    area: '',
    transactionDate: null,
    transactionType: '',
    rootCause: '',
    exceptionApprover: '',
    agingCategory: '',
    employeeResponsible: '',
    otherEmployeesResponsible: '',
    remarks: '',
    redFlag: false,
    exceptionCreator: '',
    dateCreated: null,
    category: '',
    cifNo: '',
    customerAccountNo: '',
    customerAccountName: '',
  });
  const [subExceptions, setSubExceptions] = useState<SubExceptionsListViewDTO[]>([]);

  const columns = [
    { label: 'Approval', accessor: 'approvalStatus',
      render: (rowData:any) => {
        switch (rowData.status) {
          case 1:
            return <span style={{ backgroundColor: 'blue', color: 'white', padding: 5, borderRadius: 15}} >Pending</span>;
          case 2:
            return <span style={{ backgroundColor: 'green', color: 'white', padding: 5, borderRadius: 15}}>Approved</span>;
          case 3:
            return <span style={{ backgroundColor: 'blue', color: 'red', padding: 5, borderRadius: 15}} >Rejected</span>;
          default:
            return <span>Unknown</span>;
        }
      }
    },
    { label: 'Deviation Status', accessor: 'deviationStatus', 
      render: (rowData:any) => {
        switch (rowData.deviationStatus) {
          case 1:
            return <span style={{ backgroundColor: 'blue', color: 'white', padding: 5, borderRadius: 15}} >Pending</span>;
          case 2:
            return <span style={{ backgroundColor: 'green', color: 'white', padding: 5, borderRadius: 15}}>Approved</span>;
          case 3:
            return <span style={{ backgroundColor: 'blue', color: 'red', padding: 5, borderRadius: 15}} >Rejected</span>;
          default:
            return <span>Unknown</span>;
        }
      }
    },
    { label: 'Sub-ERN', accessor: 'subReferenceNo' },
    { label: 'Deviation', accessor: 'exCodeDescription' },
    { label: 'Deviation Category', accessor: 'deviationCategory' },
    { label: 'Risk Classification', accessor: 'riskClassification' },
    { label: 'Date', accessor: 'dateCreated' }
  ];

  useEffect(() => {
    getExceptionDetails();
  }, [refNo]);

  const getExceptionDetails = async() => {
    try {
      const result = await ExceptionManagement.getExceptionDetails(refNo);
      setSubExceptions(result.data.data.subExceptionItems);
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  }
  const handleInputChange = (field: any, value: any) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', formValues);
  };
  
  const handleReset = () => {
    setFormValues({
      employeeId: '',
      exceptionReference: '',
      branchName: '',
      branchCode: '',
      division: '',
      area: '',
      transactionDate: null,
      transactionType: '',
      rootCause: '',
      exceptionApprover: '',
      agingCategory: '',
      employeeResponsible: '',
      otherEmployeesResponsible: '',
      remarks: '',
      redFlag: false,
      exceptionCreator: '',
      dateCreated: null,
      category: '',
      cifNo: '',
      customerAccountNo: '',
      customerAccountName: '',
    });
  };

  console.log(subExceptions)
  return (
    //<LocalizationProvider dateAdapter={AdapterDateFns}>
    <>
        <Grid container spacing={3}>
          {/* Information Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" mb={2}>
              Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Exception Reference Number"
                  fullWidth
                  value={formValues.exceptionReference}
                  onChange={(e) => handleInputChange('exceptionReference', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Employee ID"
                  fullWidth
                  value={formValues.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Branch Name"
                  fullWidth
                  value={formValues.branchName}
                  onChange={(e) => handleInputChange('branchName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Branch Code"
                  fullWidth
                  value={formValues.branchCode}
                  onChange={(e) => handleInputChange('branchCode', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Division"
                  fullWidth
                  value={formValues.division}
                  onChange={(e) => handleInputChange('division', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Area"
                  fullWidth
                  value={formValues.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Transaction Date"
                  value={formValues.transactionDate}
                  onChange={(newValue) => handleInputChange('transactionDate', newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <Select
                  displayEmpty
                  fullWidth
                  value={formValues.rootCause}
                  onChange={(e) => handleInputChange('rootCause', e.target.value)}
                >
                  <MenuItem value="">-- Select Root Cause --</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Exception Approver"
                  fullWidth
                  value={formValues.exceptionApprover}
                  onChange={(e) => handleInputChange('exceptionApprover', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Aging Category"
                  fullWidth
                  value={formValues.agingCategory}
                  onChange={(e) => handleInputChange('agingCategory', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formValues.redFlag}
                      onChange={(e) => handleInputChange('redFlag', e.target.checked)}
                    />
                  }
                  label="Red Flag"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Transaction Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" mb={2}>
              Transaction
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  displayEmpty
                  fullWidth
                  value={formValues.transactionType}
                  onChange={(e) => handleInputChange('transactionType', e.target.value)}
                >
                  <MenuItem value="">-- Select Transaction Type --</MenuItem>
                  <MenuItem value="Non Monetary">Non Monetary</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  displayEmpty
                  fullWidth
                  value={formValues.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <MenuItem value="">-- Select Category --</MenuItem>
                  <MenuItem value="CIF Creation">CIF Creation</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="CIF No"
                  fullWidth
                  value={formValues.cifNo}
                  onChange={(e) => handleInputChange('cifNo', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Customer Account No"
                  fullWidth
                  value={formValues.customerAccountNo}
                  onChange={(e) => handleInputChange('customerAccountNo', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Customer Account Name"
                  fullWidth
                  value={formValues.customerAccountName}
                  onChange={(e) => handleInputChange('customerAccountName', e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Box mt={2}>
          <Typography variant='h5'>Deviations:</Typography>
          <Table columns={columns} data={subExceptions} />
        </Box>
        <Box mt={2} display="flex" gap={2}>
          <Button variant="outlined" fullWidth onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
    </>
  );
};

export default ViewExceptionDetails;
