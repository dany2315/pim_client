import React, { useState, useEffect } from "react";
import { Typography, Container, Box, Button, Grid } from "@mui/material";
import Fournisseur from "./Bloc";
import { NavLink } from "react-router-dom";
import api from "../../utils/Axios";
import Bloc from "./Bloc";

function Fournisseurs() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/fournisseur/categories");
        setCategories(response.data);
        console.log(response.data);
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
            <Grid item xs={6} justifyContent="center"  direction="collumn" sx={{padding:0.5 ,}} key={index}>
              <Bloc
                categorie={categorie}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Fournisseurs;
