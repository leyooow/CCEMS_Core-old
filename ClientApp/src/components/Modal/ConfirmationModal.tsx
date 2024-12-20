import React from 'react';
import { Box, Modal, Typography, Button, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Define the props for the modal
interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  buttonName: string; // Dynamic content prop
  content: string;
  handleConfirm: () => void; // Callback for confirm action
}

// Style for the modal content
const modalStyle = {
  position: 'absolute' as const,
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const CustomModal: React.FC<CustomModalProps> = ({ open, handleClose, title, content, handleConfirm, buttonName }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose} // Allow modal close by backdrop click
      disableEscapeKeyDown // Prevent closing via Esc key for confirmation
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        {/* Modal Header */}
        <Box sx={headerStyle}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider /> {/* Divider between header and content */}

        {/* Modal Content */}
        <Typography id="modal-description" variant="body1" gutterBottom sx={{ p: 2 }}>
          {content}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Button variant="contained" color="error" onClick={handleConfirm} sx={{ mr: 1 }}>
            {buttonName}
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
