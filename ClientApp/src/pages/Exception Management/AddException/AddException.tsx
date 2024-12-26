import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddException = () => {
  const [formValues, setFormValues] = useState({
    employeeId: '',
    employeeName: '',
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
  });

  const handleInputChange = (field: string, value: any) => {
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
      employeeName: '',
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
    });
  };

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
      <>
        <Typography variant="h5" mb={2}>
          Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee ID"
              fullWidth
              value={formValues.employeeId}
              onChange={(e) => handleInputChange('employeeId', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth>
              Validate
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              displayEmpty
              fullWidth
              value={formValues.branchName}
              onChange={(e) => handleInputChange('branchName', e.target.value)}
            >
              <MenuItem value="">-- Select Branch --</MenuItem>
              {/* Add branch options here */}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Branch Code"
              fullWidth
              value={formValues.branchCode}
              onChange={(e) => handleInputChange('branchCode', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
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
              value={formValues.transactionType}
              onChange={(e) => handleInputChange('transactionType', e.target.value)}
            >
              <MenuItem value="">-- Select Transaction --</MenuItem>
              {/* Add transaction type options here */}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              displayEmpty
              fullWidth
              value={formValues.rootCause}
              onChange={(e) => handleInputChange('rootCause', e.target.value)}
            >
              <MenuItem value="">-- Select Root Cause --</MenuItem>
              {/* Add root cause options here */}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee Responsible"
              fullWidth
              value={formValues.employeeResponsible}
              onChange={(e) => handleInputChange('employeeResponsible', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Other Employee's Responsible"
              fullWidth
              value={formValues.otherEmployeesResponsible}
              onChange={(e) => handleInputChange('otherEmployeesResponsible', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              multiline
              rows={4}
              fullWidth
              value={formValues.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
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
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth onClick={handleReset}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </>
    // </LocalizationProvider>
  );
};

export default AddException;
