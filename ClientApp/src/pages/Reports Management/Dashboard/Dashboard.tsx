import React, { useCallback, useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PaginationControls from '../../../components/Pagination/PaginationControls';
import Table from '../../../components/Table/Table';
import ReportService from '../../../services/ReportService';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  DialogContent,
  Divider,
  Select,
} from "@mui/material";
import { DownloadAdhocViewModel, AdhocStatusDisplayNames,PaginatedList, AdhocStatus } from '../../../models/reportDTO';
import EditIcon from "@mui/icons-material/Edit";
import { SelectChangeEvent } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


const Dashboard: React.FC = () =>  {
    const [value, setValue] = React.useState(2);
    const [formData, setFormData] = useState<DownloadAdhocViewModel>({
      dateFrom: new Date().toISOString(),
      dateTo: new Date().toISOString(),  
      reportAdhoc: 2,
      rt: {
          coveredBranch: 0,
          employeeID: '',
      },
      pr: {
          employeeID: '',
      },
      ea: {
          exceptionStatus: 4,
      },
    });
    const [searchString, setSearchString] = useState<string>(""); 
    const [pagedResult, setPagedResult] = useState<PaginatedList>({
      data: [],
      pageIndex: 1,
      totalPages: 0,
      countData: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    });
    const columns = [
      {
        label: '',
        render: (data : any) => (
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <EditIcon />
            }
          >
          </Button>
        ),
      },
      {
        label: 'Status',
        accessor: 'status',
      },
      {
        label: 'BR Code',
        accessor: 'selectedBranches',
      },
      {
        label: 'Category',
        accessor: 'reportCategory',
      },
      {
        label: 'Coverage',
        accessor: 'reportCoverage',
      },
      {
        label: 'Date Coverage',
        render: (data: any) => new Date(data.coverageDate).toLocaleDateString('en-US'),
      },
      {
        label: 'Date Generated',
        render: (data: any) => new Date(data.dateGenerated).toLocaleDateString('en-US'),
      },
      {
        label: 'Generated By',
        accessor: 'createdBy',
      },
    ];

    const TabOnChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);  
      setFormData((prevFormData) => ({
        ...prevFormData,
        reportAdhoc: newValue, // Update reportAdhoc with the new value from the tab change
      }));
      console.log(newValue);
    };
    const InputOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<AdhocStatus>) => {
      const { name, value } = e.target;
      const keys = name.split('.'); // Split the name into keys to handle nested paths
  
      setFormData((prevState) => {
        const newState = { ...prevState };
        let current = newState;
  
        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            current[key] = value; // Update the actual value at the deepest level
          } else {
            if (!current[key]) {
              current[key] = {}; // Ensure nested objects are initialized if they don't exist
            }
            current = current[key]; // Move deeper into the nested structure
          }
        });
        console.log(newState);
        return newState;
      });
    };
  
    const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>| SelectChangeEvent<AdhocStatus>) => {
      // Use the `name` from the event directly, which is the key path
      InputOnChange(e);
    };

    function a11yProps(index: number) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    
    function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
    }

    const SubmitDownloadAdhoc = async (e: any) =>{
        e.preventDefault();
        console.log('Form submitted:', formData);
        const result = await ReportService.downloadAdhoc(formData);
        console.log(result);
    }

    const GetReportList = async () => {
      try {
        const result = await ReportService.getlist(
          searchString,
          pagedResult.pageIndex,
        );
        var x = result.data;
        setPagedResult({
          pageIndex: x.pageIndex,
          totalPages: x.totalPages,
          countData: x.countData,
          hasPreviousPage: x.hasPreviousPage,
          hasNextPage: x.hasNextPage,
          data: x.data,
        });
      } catch (error) {
        console.error("Error GetReportList", error);
      }
    };
    useEffect(() => {
      GetReportList();
    }, [pagedResult.pageIndex]);
    
  const handlePageChange = (newPage: number) => {
    setPagedResult({
      ...pagedResult,
      pageIndex: newPage,
    });
  };
  const SearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value );
  };   
  const SearchOnClick = () => {
    
    setPagedResult({
      ...pagedResult,
      pageIndex: 1,
    });
    GetReportList();
  };
  
  return <>
    <h1 style={{ color: '#1976d2' }}>Dashboard</h1>
    <h4> Download TAT/ADHOCS Reports </h4>
    <Divider sx={{ bgcolor: "black" }} />
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={TabOnChange} 
          aria-label="basic tabs example" 
          variant="fullWidth"
        >
          <Tab label="Regularization TAT" value={2} {...a11yProps(2)} />
          <Tab label="Pervasiveness" value={1} {...a11yProps(1)} />
          <Tab label="Exception Adhocs" value={4} {...a11yProps(4)} />
        </Tabs>
      </Box>

      <form onSubmit={SubmitDownloadAdhoc}>
        {/* Regularization TAT Tab */}
        {value === 2 && (
          <DialogContent sx={{ overflowY: 'unset' }}>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={3}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  name="rt.employeeID"
                  value={formData.rt.employeeID}
                  onChange={handleNestedChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <TextField
                  label="Date From"
                  variant="outlined"
                  fullWidth
                  name="dateFrom"
                  value={formData.dateFrom}
                  onChange={handleNestedChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <TextField
                  label="Date To"
                  variant="outlined"
                  fullWidth
                  name="dateTo"
                  value={formData.dateTo}
                  onChange={handleNestedChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Button type="submit" variant="contained" color="success" size="large">
                  Download
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        )}

        {/* Pervasiveness Tab */}
        {value === 1 && (
          <DialogContent sx={{ overflowY: 'unset' }}>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={3}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  name="pr.employeeID"
                  value={formData.pr.employeeID}
                  onChange={handleNestedChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <TextField
                  label="Date From"
                  variant="outlined"
                  fullWidth
                  name="dateFrom"
                  value={formData.dateFrom}
                  onChange={handleNestedChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <TextField
                  label="Date To"
                  variant="outlined"
                  fullWidth
                  name="dateTo"
                  value={formData.dateTo}
                  onChange={handleNestedChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Button type="submit" variant="contained" color="success" size="large">
                  Download
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        )}

        {/* Exception Adhocs Tab */}
        {value === 4 && (
          <DialogContent sx={{ overflowY: 'unset' }}>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={3}>
                  <Select
                      size="small"
                      label="Status"
                      variant="outlined"
                      fullWidth
                      name="ea.exceptionStatus"
                      labelId="Status"
                      id="exceptionStatus"
                      value={formData.ea.exceptionStatus}
                      onChange={handleNestedChange}
                      renderValue={formData.ea.exceptionStatus ? undefined : () => "Select Exception Status"}
                  >
                      {Object.values(AdhocStatus)
                          .filter((value) => typeof value === 'number')
                          .map((status) => (
                              <MenuItem key={status} value={status}>
                                  {AdhocStatusDisplayNames[status as AdhocStatus]}
                              </MenuItem>
                          ))}
                  </Select>
              </Grid>
              <Grid item xs={4} sm={3}>
                <TextField
                  size="small"
                  label="Date From"
                  variant="outlined"
                  fullWidth
                  name="dateFrom"
                  value={formData.dateFrom}
                  onChange={handleNestedChange}
                  required
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <TextField
                  size="small"
                  label="Date To"
                  variant="outlined"
                  fullWidth
                  name="dateTo"
                  value={formData.dateTo}
                  onChange={handleNestedChange}
                  required
                />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Button type="submit" variant="contained" color="success" size="large">
                  Download
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </form>
    </Box>
    <Divider sx={{ bgcolor: "black" }} />
    <h4 style={{ marginTop: 10}}> Reports List </h4>
    <DialogContent  
              sx={{
              overflowY: 'unset',
            }}>
        <Grid container>
          <Grid item xs={3} sm={2}>
          <TextField
            label="Branch Code"
            variant="outlined"
            size="small"
            value={searchString}  
            onChange={SearchOnChange}  
          />
          </Grid>
          <Grid item xs={3} sm={2}>
          <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              onClick={SearchOnClick} 
            >
              Search
            </Button>
          </Grid>
        </Grid>
    </DialogContent>
    <Table columns={columns} data={pagedResult.data} />
    <PaginationControls
      currentPage={pagedResult.pageIndex}
      totalPages={pagedResult.totalPages ?? 0}
      onPageChange={handlePageChange}
      totalItems={pagedResult.countData}
    />
    <Divider sx={{ bgcolor: "black" }} />
  </>
}
export default Dashboard
