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
import axios from "axios";
import Search from "../Search";
import ProduitMobile from "../mobile/ProduitMobile";
import Produit from "./Produit";

function Produits() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [filtre, setFiltre] = useState("");
  const [produits, setproduits] = useState([]);
  const [triPrix, setTriPrix] = useState("croissant");
  const [ref, setRef] = useState("");

  const onSearch = async (reference) => {
      setRef(reference)
      try {
        const response = await axios.get(
          `http://localhost:5000/api/produits/${reference}`
        );
        setproduits(response.data);
      } catch (error) {
        console.log(`erreur lors de la recuperations du produit ${reference} `, error);
      }
   
  };

  const handleChangeFiltre = (event) => {
    setFiltre(event.target.value);
  };

  const handleChangeTriPrix = (event) => {
    setTriPrix(event.target.value);
  };

  const produitsFiltres = produits.filter((produit) => {
    return produit.produit.prix >= filtre;
  });


  const trierProduits = (produits) => {
    if (triPrix === "croissant") {
      return produits.sort((a, b) => a.produit.prix - b.produit.prix);
    } else if (triPrix === "decroissant") {
      return produits.sort((a, b) => b.produit.prix - a.produit.prix);
    } else {
      return produits;
    }
  };

  const produitsTries = trierProduits(produitsFiltres);

  return (
    <Container maxWidth="md" >
      <Typography variant="h5">Liste des resultats</Typography>
      <Search onSearch={onSearch} />
      {console.log(produitsFiltres)}
      {produitsTries.length === 0? null:
        <Grid
          container
          alignItems="center"
          justifyContent={isMobile?"center":"flex-end"}
          spacing={2}
          sx={{ marginLeft: 0 }}
        >
          <Grid item sx={{paddingLeft: "0px !important"}}>
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
                <MenuItem value="7">Prix >= 7€</MenuItem>
                <MenuItem value="20">Prix >= 20€</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: 120, marginTop: "16px" }}>
              <InputLabel id="select-tri-label">Tri</InputLabel>
              <Select
                labelId="select-tri-label"
                id="select-tri"
                value={triPrix}
                onChange={handleChangeTriPrix}
                label="Tri"
              >
                <MenuItem value="croissant">Prix croissant</MenuItem>
                <MenuItem value="decroissant">Prix décroissant</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      }

      <Grid container spacing={2} direction="column" sx={{ marginTop: "16px" }}>
        {produitsTries.length === 0 ? (
          <Typography variant="body1">
            Aucun produit ne correspond aux critères de recherche.
          </Typography>
        ) : (
          produitsTries.map((produit, index) => (
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
                  collectionName={produit.nameFourn}
                  reference={ref}
                  prix={produit.produit.prix}
                  stock={produit.produit.stock}
                  />
                ) : (
                  <Produit
                    collectionName={produit.nameFourn}
                    reference={ref}
                    prix={produit.produit.prix}
                    stock={produit.produit.stock}
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
