import React from "react";
import {Snackbar, Alert } from "@mui/material";


const Pop = ({message,open,handleClose,status}) =>{




    return(
        <>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ transition: 'transform 0.3s ease-out', transform: open ? 'translateX(0)' : 'translateX(100%)' }}>
        <Alert onClose={handleClose} severity={status} sx={{ width: 300 }}>
      {message}
        </Alert>
      </Snackbar>
        </>
    )
}
export default Pop

