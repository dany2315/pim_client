import React, { useState , useEffect} from "react";
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
import FournisseurMobile from "../mobile/FournisseurMobile";
import Fournisseur from './Fournisseur'

function Fournisseurs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [fournisseurs, setfournisseurs] = useState([]);


useEffect(() => {
    const onSearch = () => {
        
        const allfournisseurs = [
            {
                nom:"PICATA",
                distance:265,
                articles:876890

            },
            {
                nom:"zer",
                distance:3456,
                articles:5676543

            },
            {
                nom:"fratr",
                distance:9876,
                articles:12345678

            }
        ]
        setfournisseurs(allfournisseurs);
      };

 onSearch()
}, [])



 

  

 

  return (
    <Container maxWidth="md">
      <Typography variant="h5">Liste des Fournisseurs</Typography>
      
    
       
      

      <Grid container spacing={2} direction="column" sx={{ marginTop: "16px" }}>
        {fournisseurs.length === 0 ? (
          <Typography variant="body1">
            Aucun fournisseur a ete enregistrer.
          </Typography>
        ) : (
          fournisseurs.map((fournisseur, index) => (
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
                  <FournisseurMobile
                    nom={fournisseur.nom}
                    distance={fournisseur.distance}
                    articles={fournisseur.articles}
                    
                  />
                ) : (
                  <Fournisseur
                  nom={fournisseur.nom}
                  distance={fournisseur.distance}
                  articles={fournisseur.articles}
                 
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

 export default Fournisseurs