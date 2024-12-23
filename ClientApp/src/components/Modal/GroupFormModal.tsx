import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ERROR_MESSAGES } from '../../utils/constants';
import { BranchOption } from '../../models/groupDTOs';
import GroupService from '../../services/groupService';

interface FormData {
  code: string;
  name: string;
  area: string;
  division: string;
}

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSave: () => void;
}

const GroupFormModal: React.FC<ModalProps> = ({ open, handleClose, title, formData, setFormData, handleSave }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [branchOptions, setBranchOptions] = useState<BranchOption[]>([]);

  useEffect(() => {
    if (open) {
      fetchBranchCodes(); // Fetch branch codes when the modal opens
    }
  }, [open]);

  const fetchBranchCodes = async (searchTerm = '') => {
    try {
      const response = await GroupService.getBranchCodes(1, 10, searchTerm); // Adjust page size and number as needed
      setBranchOptions(response.items); // Assuming response.items contains the list of branches
    } catch (error) {
      console.error('Error fetching branch codes:', error);
    }
  };

  const handleBranchSearch = (_: React.ChangeEvent<{}>, value: string) => {
    fetchBranchCodes(value);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validate = () => {
    let tempErrors: Record<string, string> = {};

    if (!formData.code) tempErrors.code = ERROR_MESSAGES.REQUIRED_FIELD;
    if (!formData.area) tempErrors.area = ERROR_MESSAGES.REQUIRED_FIELD;
    if (!formData.name) tempErrors.name = ERROR_MESSAGES.REQUIRED_FIELD;
    if (!formData.division) tempErrors.division = ERROR_MESSAGES.REQUIRED_FIELD;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBranchChange = (_: any, value: BranchOption | null) => {
    if (value) {
      setFormData((prevData: FormData) => ({
        ...prevData,
        code: value.brCode, // Set the branch code
        name: value.brName, // Set the branch name directly here
      }));
    }
  };

  const handleSaveWithValidation = () => {
    if (validate()) {
      handleSave();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        {/* Branch Code with Autocomplete */}
        <Autocomplete
          options={branchOptions}
          getOptionLabel={(option: BranchOption) => `${option.brCode}`}
          onInputChange={handleBranchSearch}
          onChange={handleBranchChange}
          renderInput={(params) => (
            <TextField {...params} label="Branch Code" variant="outlined" size="small" fullWidth margin="normal" />
          )}
        />

        {/* Branch Name Field */}
        <TextField
          label="Branch Name"
          variant="outlined"
          size="small"
          value={formData.name} // Directly bind the branch name here
          fullWidth
          margin="normal"
          disabled // Make it read-only since it is auto-filled
        />

        {/* Area Field */}
        <TextField
          label="Area"
          variant="outlined"
          size="small"
          value={formData.area}
          fullWidth
          margin="normal"
          error={!!errors.area}
          helperText={errors.area}
          onChange={(e) => handleInputChange('area', e.target.value)}
        />

        {/* Division Field */}
        <TextField
          label="Division"
          variant="outlined"
          size="small"
          value={formData.division}
          fullWidth
          margin="normal"
          error={!!errors.division}
          helperText={errors.division}
          onChange={(e) => handleInputChange('division', e.target.value)}
        />

        {/* Action Buttons */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveWithValidation}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GroupFormModal;