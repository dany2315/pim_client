import React, { useState } from "react";
import {
  Box,
  FormControl,
  Typography,
  Select,
  MenuItem,
  Container,
  Grid,
  InputLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getRef } from "../../controllers/getRef";
import Search from "../Search";
import ProduitMobile from "../mobile/ProduitMobile";
import Produit from "./Produit";

function Produits() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [filtre, setFiltre] = useState("");
  const [produits, setproduits] = useState([]);

  const onSearch = (reference) => {
    const res = getRef(reference);
    const allProduits = res
    setproduits(allProduits);
  };

  const handleChangeFiltre = (event) => {
    setFiltre(event.target.value);
  };

  const produitsFiltres = produits.filter((produit) => {
    return produit.prix >= filtre;
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h5">Liste des Fournisseur</Typography>
      <Search onSearch={onSearch} />
      {produitsFiltres.length === 0? null:
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
        >
          <Grid item>
            <FormControl sx={{ minWidth: 120, marginTop: "16px" }}>
              <InputLabel id="select-filtre-label">Filtre</InputLabel>
              <Select
                labelId="select-filtre-label"
                id="select-filtre"
                value={filtre}
                onChange={handleChangeFiltre}
                label="Filtre"
              >
                <MenuItem value="">Tous les produits</MenuItem>
                <MenuItem value="10">Prix >= 10€</MenuItem>
                <MenuItem value="20">Prix >= 20€</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      }

      <Grid container spacing={2} direction="column" sx={{ marginTop: "16px" }}>
        {produitsFiltres.length === 0 ? (
          <Typography variant="body1">
            Aucun produit ne correspond aux critères de recherche.
          </Typography>
        ) : (
          produitsFiltres.map((produit, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "grey",
                  },
                }}
              >
                {isMobile ? (
                  console.log(isMobile),
                  <ProduitMobile
                    reference={produit.reference}
                    prix={produit.prix}
                    disponibilite={produit.disponibilite}
                    stock={produit.stock}
                  />
                ) : (
                  <Produit
                    reference={produit.reference}
                    prix={produit.prix}
                    disponibilite={produit.disponibilite}
                    stock={produit.stock}
                  />
                )}
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Produits;
