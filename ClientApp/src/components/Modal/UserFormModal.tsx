import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { ERROR_MESSAGES } from "../../utils/constants";

interface UserFormProps {
  formData: {
    username: string;
    employeeId: string;
    lastName: string;
    firstName: string;
    middleInitial: string;
    email: string;
    userRole: string;
    branches: string[];
  };
  onChange: (e: any) => void;
  onBranchChange: (event: any, value: any) => void;
  handleSubmit: (e: any) => void;
  roles: string[];
  branchOptions: string[];
  onCancel: () => void;
  isEditMode?: boolean;
  userData?: any; // Passed user data if editing
}

// Style for the modal content
const modalStyle = {
  pt: 2,
  pr: 4,
  pb: 2,
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const UserFormModal: React.FC<UserFormProps> = ({
  formData,
  onChange,
  onBranchChange,
  handleSubmit,
  roles,
  branchOptions,
  onCancel,
  isEditMode = false,
  userData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (isEditMode && userData) {
      onChange({ target: { name: "username", value: userData.username } });
      onChange({ target: { name: "employeeId", value: userData.employeeId } });
      onChange({ target: { name: "lastName", value: userData.lastName } });
      onChange({ target: { name: "firstName", value: userData.firstName } });
      onChange({ target: { name: "middleInitial", value: userData.middleInitial } });
      onChange({ target: { name: "email", value: userData.email } });
      onChange({ target: { name: "userRole", value: userData.userRole } });
      onBranchChange(null, userData.branches);
    }
  }, [isEditMode, userData, onChange, onBranchChange]);

  const validate = () => {
    let tempErrors: Record<string, string> = {};

    if (!formData.username) tempErrors.username = ERROR_MESSAGES.REQUIRED_FIELD;
    if (!formData.employeeId) tempErrors.employeeId = ERROR_MESSAGES.REQUIRED_FIELD;;
    if (!formData.lastName) tempErrors.lastName = ERROR_MESSAGES.REQUIRED_FIELD;
    if (!formData.firstName) tempErrors.firstName = ERROR_MESSAGES.REQUIRED_FIELD;
    if (!formData.email) tempErrors.email = ERROR_MESSAGES.REQUIRED_FIELD;
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email))
      tempErrors.email = "Invalid email format.";
    if (!formData.userRole) tempErrors.userRole = "User Role is required.";
    if (formData.branches.length === 0) tempErrors.branches = "Branches are required.";

    setErrors(tempErrors);
    // console.log(tempErrors)
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
    }
  };
  
  return (
    <>
    <Box sx={modalStyle}>
       {/* Replace your existing DialogTitle section: */}
       <DialogTitle sx={headerStyle}>
          {isEditMode ? "Edit User" : "Create New User"}
          <IconButton onClick={onCancel} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ overflowX: "hidden" }}>
          {/* Box wrapper for consistent alignment and spacing */}
          <Box sx={{ px: 3 }}> {/* Adjust padding as needed */}
            <Grid container spacing={2}>
              {/* Username and Employee ID */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  value={formData.username}
                  onChange={onChange}
                  placeholder="BOC active directory"
                  required
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={onChange}
                  required
                  error={!!errors.employeeId}
                  helperText={errors.employeeId}
                />
              </Grid>

              {/* Last Name, First Name, Middle Initial */}
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={formData.lastName}
                  onChange={onChange}
                  required
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChange}
                  required
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Middle (MI)"
                  variant="outlined"
                  fullWidth
                  name="middleInitial"
                  value={formData.middleInitial}
                  onChange={onChange}
                />
              </Grid>

              {/* Email and User Role */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="User Role"
                  variant="outlined"
                  fullWidth
                  name="userRole"
                  value={formData.userRole}
                  onChange={onChange}
                  required
                  error={!!errors.userRole}
                  helperText={errors.userRole}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Branches with Multi-Select Autocomplete */}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={branchOptions}
                  getOptionLabel={(option) => option}
                  value={formData.branches}
                  onChange={onBranchChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Branches"
                      placeholder="Select branches"
                      variant="outlined"
                      fullWidth
                      error={!!errors.branches}
                      helperText={errors.branches}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <Divider />

        {/* Dialog Actions */}
        <DialogActions>
          <Button onClick={onCancel} variant="outlined" color="error">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success" onClick={handleFormSubmit}>
            {isEditMode ? "Save" : "Add"}
          </Button>
        </DialogActions>
    </Box>
 
    </>
  );
};

export default UserFormModal;
