import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />

      <Typography>En cours....</Typography>
    </Backdrop>
  );
};

export default Loading;
