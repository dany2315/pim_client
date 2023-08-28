import { useEffect, useState } from "react";
import api from "../../../utils/Axios";
import { Grid, Typography } from "@mui/material";
import Fournisseur from "./Fournisseur";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer } from '@fortawesome/free-solid-svg-icons';

const Bloc = (props) => {
  const categorie = props.categorie
  const [fournisseurs, setfournisseurs] = useState([]);

  useEffect(() => {
    const fetchFournisseur = async () => {
      
      try {
        const response = await api.post("/fournisseur", {
          id:categorie._id
        });
        console.log("listFourn ajout", response.data);
        setfournisseurs(response.data);
      } catch (error) {
        console.log("erreur lors de la recuperations des fournisseurs", error);
      }
    };

    fetchFournisseur();
  }, []);

  return (
    <> 
    <Typography variant="h5" color={"#8eb8fb"} fontFamily={"cursive"}>
        <FontAwesomeIcon icon={faServer} style={{color: "#8eb8fb",}} /> {categorie.name}
      </Typography>
      {console.log("cat",categorie)}
      <Grid overflow={"auto"} sx={{border:1,padding:2,borderRadius:3,borderColor:"#8eb8fb",height:"205px"}}>
          
      {fournisseurs.length === 0 ? (
        <Typography variant="body1">
          Aucun fournisseur a ete enregistrer.
        </Typography>
      ) : (
        <>
       
         
        
            {fournisseurs.map((fournisseur, index) => (

              <Fournisseur
                key={index}
                collectionName={fournisseur.collectionName}
                fieldNames={fournisseur.fieldNames}
                categorie={categorie}
              />
            ))}
          
        </>
      )}
      </Grid>
    </>
  );
};

export default Bloc;
