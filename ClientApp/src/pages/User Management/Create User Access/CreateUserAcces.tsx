import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const CreateUserAccess: React.FC = () => {
  const [open, setOpen] = useState(false); // Modal open/close state
  const [formData, setFormData] = useState({
    username: "",
    employeeId: "",
    lastName: "",
    firstName: "",
    middleInitial: "",
    email: "",
    userRole: "",
    branches: [],
  });

  const roles = ["Admin", "User", "Manager", "Viewer"];
  const branchOptions = [
    "Branch 1",
    "Branch 2",
    "Branch 3",
    "Branch 4",
    "Branch 5",
    "Branch 6",
  ];

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBranchChange = (event: any, value: any) => {
    setFormData({ ...formData, branches: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setOpen(false); // Close modal on submit
  };

  return (
    <>
      {/* Button to open modal */}
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create New User
      </Button>

      {/* Modal Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Create New User</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Username and Employee ID */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="BOC active directory"
                  required
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required

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
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Middle (MI)"
                  variant="outlined"
                  fullWidth
                  name="middleInitial"
                  value={formData.middleInitial}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
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
                  onChange={handleChange}
                  required
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
                  onChange={handleBranchChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Branches"
                      placeholder="Select branches"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          {/* Dialog Actions */}
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="outlined" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="success">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateUserAccess;
