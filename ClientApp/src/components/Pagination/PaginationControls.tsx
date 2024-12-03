// src/components/PaginationControls.tsx
import React from 'react';
import { Grid, Button, Typography, Pagination } from '@mui/material';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;  // Added totalItems prop
    onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, totalItems, onPageChange }) => {
    return (
        <Grid container spacing={2} alignItems="center"
            sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', paddingRight: '2em' }}>

            {/* Display total items */}
            <Grid item>
                <Typography variant="body2">
                    Showing {currentPage} to {totalPages} of {totalItems} entries
                </Typography>
            </Grid>

            {/* Pagination Component from MUI */}
            <Grid item>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => onPageChange(page)}
                    color="primary"
                    siblingCount={1} // Adjust number of pages to show on each side of the current page
                />
            </Grid>
        </Grid>
    );
};

export default PaginationControls;
