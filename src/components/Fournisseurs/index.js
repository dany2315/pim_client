import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
} from "@mui/material";
import Fournisseur from "./Fournisseur";
import axios from "axios";
import { NavLink } from "react-router-dom";


function Fournisseurs() {

  const [fournisseurs, setfournisseurs] = useState([]);


  useEffect(() => {
    const fetchFournisseur = async () => {
      try {
        const response = await axios.get(
          "https://pim-nyun.onrender.com/api/fournisseur"
        );
        console.log("listFourn ajout", response.data);
        setfournisseurs(response.data);
      } catch (error) {
        console.log("erreur lors de la recuperations des fournisseurs", error);
      }
    };

    fetchFournisseur();
  }, []);




  return (
    
      
        <Container maxWidth="md">
          <Typography variant="h5" color={"#82CEF9"} fontFamily={"cursive"}>Liste des Fournisseurs</Typography>


          <Box sx={{ textAlign: "right" }}>
              
                  <Button
                   
                    variant="contained"
                    component={NavLink}
                    to="/newFournisseur"
                    sx={{
                      fontSize:23,
                      borderRadius: "20px",
                      backgroundColor: "#82CEF9",
                      color: "white",
                    }}
                  >
                    <div>+</div>
                  </Button>
            </Box>


          <Grid
            container
            spacing={2}
            direction="column"
            sx={{ marginTop: "16px" }}
          >
            {fournisseurs.length === 0 ? (
              <Typography variant="body1">
                Aucun fournisseur a ete enregistrer.
              </Typography>
            ) : (
              fournisseurs.map((fournisseur, index) => (
                <Grid item xs={2} key={index}>
                      <Fournisseur
                        collectionName={fournisseur.collectionName}
                        fieldNames={fournisseur.fieldNames}
                      />
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      )}

export default Fournisseurs;
