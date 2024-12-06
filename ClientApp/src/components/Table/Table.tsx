
import React from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Column {
  label: string;
  accessor?: string; 
  render?: (row: any) => React.ReactNode; 
}

interface TableProps {
  columns: Column[]; 
  data: any[]; 
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 600, 
      }}
    >
      <MuiTable stickyHeader sx={{ minWidth: 600 }}>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: 'background.paper', 
                  position: 'sticky',
                  top: 0, 
                  zIndex: 1, 
                  textAlign: 'center',  
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} sx={{textAlign: 'center', placeItems: 'center'}}>
                    {column.render ? column.render(row) : row[column.accessor || '']}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
