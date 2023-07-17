import React, { useContext } from 'react';
import { Snackbar , Alert} from '@mui/material';
import { SnackbarContext } from '../../context/snackbarContext';

const CustomSnackbar = () => {
  const { snackbarOpen, snackbarMessage, snackbarSeverity, hideSnackbar } = useContext(SnackbarContext);

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
       
        sx={{
          transition: "transform 0.3s ease-out",
          transform: snackbarOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <Alert onClose={hideSnackbar} severity={snackbarSeverity} sx={{ width: 300 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default CustomSnackbar;
