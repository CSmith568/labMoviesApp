import { Box, Button, Typography } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: 3, 
      padding: '30px', 
      marginTop: '20px'
    }}>
      <Button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        variant="contained"
      >
        Previous
      </Button>
      <Typography variant="h6" sx={{ alignSelf: 'center' }}>
        Page {currentPage} of {totalPages}
      </Typography>
      <Button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        variant="contained"
      >
        Next
      </Button>
    </Box>
  );
};
