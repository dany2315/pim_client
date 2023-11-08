import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Fournisseur from "./Bloc";
import { NavLink } from "react-router-dom";
import api from "../../utils/Axios";
import Bloc from "./Bloc";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";

function Fournisseurs() {
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/fournisseur/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          component={NavLink}
          to="/newFournisseur"
          sx={{
            fontSize: 23,
            borderRadius: "20px",
            backgroundColor: "#8eb8fb",
            color: "white",
            "&:hover": {
              backgroundColor: "#8eb8fb",
            },
          }}
        >
          <div>+</div>
        </Button>
      </Box>

      <Grid container spacing={3} direction="row" sx={{ marginTop: "16px" }}>
        {categories.map((categorie, index) => (
          <Grid
            item
            xs={isMobile ? 12 : 6}
            justifyContent="center"
            direction="collumn"
            sx={{ padding: 0.5 }}
            key={index}
          >
            <Bloc categorie={categorie} />
          </Grid>
        ))}

        
      
      </Grid>
     
    </Container>
  );
}

export default Fournisseurs;
