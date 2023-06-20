import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;