import React , {useContext} from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import {LoadingContext} from "../../context/loadingContext"


const Loading = () => {

const {open} = useContext(LoadingContext)

  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />

      <Typography>En cours....</Typography>
    </Backdrop>
  );
};

export default Loading;
