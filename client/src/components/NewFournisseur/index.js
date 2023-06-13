import { useState } from "react";
import axios from "axios";

import {
  TextField,
  FormHelperText,
  Grid,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import Loading from "../Loading";
import NameChamp from "./NameChamp";
import { Navigate } from "react-router-dom";

const NewFournisseur = (props) => {
  
  const { keyNames, file, data ,onClose } = props;
  //objet modifiedNames et l'object ou son regrouper les changement
  //de keyName du menu deroulant avec l'index du changement qui est
  //en fonction de l'index qui recoit du mapim de keyNames sans le reste de keyNames
  const [modifiedNames, setModifiedNames] = useState({});
  //data avec modif des champs
  const [updatedData, setUpdatedData] = useState([]);
  const [nameCollect, setNameCollect] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState();


  
  const handleChange = (e) => {
    const nameFourn = e.target.value;
    console.log(nameFourn);
    setNameCollect(nameFourn);
  };

  const handleS = (collectName) => {
    if (collectName.endsWith("s")) {
      return collectName;
    } else {
      return collectName + "s";
    }
  };
  //fonction qui set la const ModifiedNames avec l'index du keyNames map
  //et la value du select
  const handleNameChange = (e, index) => {
    const { value } = e.target;
    setModifiedNames((prevNames) => {
      const updatedNames = { ...prevNames };
      if (value === "") {
        delete updatedNames[index];
      } else {
        updatedNames[index] = value;
      }
      return updatedNames;
    });
    console.log("modifiedNames :", modifiedNames);
  };

  //fonction qui fais les changement des keyName avec le modifiedNames
  const handleSave = async () => {
    try {
      setIsLoading(true)
      const resultName = handleS(nameCollect);

      console.log("azerty", resultName);

      const upKeyNames = keyNames.map((keyName, index) => {
        if (modifiedNames.hasOwnProperty(index)) {
          return modifiedNames[index];
        }
        return keyName;
      });

      const updateDatascop = data.map((item) => {
        const updatedItem = {};
        Object.keys(item).forEach((key, index) => {
          const updatedKey = upKeyNames[index];
          if (updatedKey) {
            updatedItem[updatedKey] = item[key];
          }
        });
        upKeyNames.forEach((updatedKey, index) => {
          if (updatedKey === "indispenssable") {
            delete updatedItem[index]; // Supprimer la clé
            delete updatedItem[updatedKey]; // Supprimer la valeur correspondante
          }
        });
        return updatedItem;
      });
      setUpdatedData(updateDatascop);
      console.log("upKeyNames :", upKeyNames);

      // Appel à l'API pour sauvegarder les données
      await axios.post(
        "http://localhost:5000/api/fournisseur/new",
        {
          collectionName: resultName,
          data: updateDatascop,
          fieldNames: upKeyNames,
        }
      );
      
      try {
        const result = await axios.post("http://localhost:5000/api/fournisseur/newFourn", {
          collectionName: resultName,
          fieldNames: upKeyNames,
        });
        setIsLoading(false)
        setResultData(result.data)
        console.log("result newfourn :", result);
        

        console.log("Données sauvegardées avec succès dans listFourn!");
      } catch (error) {
        console.error(
          "Erreur lors de la sauvegarde des données listeFourn :",
          error
        );
      }
      console.log("Données sauvegardées avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données :", error);
    }

    console.log(updatedData);
    console.log("Data  :", data);
    console.log("keyNames :", keyNames);
    console.log("Data mis à jour :", updatedData);
  };

  const reload = () => {
    window.location.reload();
  }
      //fonction pour upload le fichier csv grace a papaparse
  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (resultData ? <>{reload()}</>:
          
          <Container maxWidth="md">
            
                  <Box sx={{ marginBottom: 2, textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{
                        borderRadius: "20px",
                        backgroundColor: "#82CEF9",
                        color: "white",
                        "&:hover": {
                          color: "#82CEF9",
                        },
                      }}
                    >
                      {file.name}
                    </Button>
                  </Box>

                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      sx={{ textAlign: "center", marginTop: 3 }}
                    >
                      <Typography>
                        Liste des champs du fichier CSV importer
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      x={{ textAlign: "center", marginBottom: 3 }}
                    >
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                        onChange={(e) => handleChange(e)}
                      >
                        <TextField
                          id="filled-search"
                          label="nom du fournisseur"
                          type="search"
                          variant="standard"
                          size="small"
                        />
                        <FormHelperText
                          id="component-helper-text"
                          sx={{ marginTop: "0 !important" }}
                        >
                          Mettre que des minuscules
                        </FormHelperText>
                      </Box>
                    </Grid>

                    {keyNames.map((keyName, index) => (
                      <>
                        {console.log(
                          "liste modifiedNames objet:",
                          modifiedNames
                        )}
                        {console.log("liste updateData array:", updatedData)}

                        <NameChamp
                          keyName={keyName}
                          index={index}
                          onNameChange={handleNameChange}
                          modifiedNames={modifiedNames}
                        />
                      </>
                    ))}
                    <Grid
                      item
                      xs={12}
                      sm={14}
                      sx={{ textAlign: { sm: "center" }, mt: 5 }}
                    >
                      <Button onClick={handleSave}>sauvgarder</Button>
                    </Grid>
                  </Grid>
               
              
              {console.log(updatedData)}
            
          </Container>
        )}
    </>
  );
};
export default NewFournisseur;
