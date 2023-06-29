import { Grid, Typography, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Papa from "papaparse";
import { useState, useEffect } from "react";

const Fournisseur = ({ collectionName, fieldNames }) => {

  const [keyNames, setKeyNames] = useState([]);
  const [plein, setPlein] = useState(false);
  const collect = collectionName;

  
 useEffect(() => {
    GetRempli();
  }, []);

  const GetRempli = async () => {
    try {
      const reponse = await axios.get(
        `https://pim-nyun.onrender.com/api/fournisseur/${collect}`
      );
      setPlein(reponse.data);
      console.log(`reponse data ${collect} `, reponse.data);
    } catch (error) {
      console.log("erreur lors de la recup plein ", error);
    }
  };

  const handleReSave = async (event) => {
    const updatedData = await handleFile(event);
    console.log("liste key names ", keyNames);
    console.log("liste fieldNames : ", fieldNames);
    console.log("data : ", updatedData);
    //Sortir le data final en enlevant les champs et les valeur des
    //articles indispenssable et garder que les autre
    const updateDatascop = updatedData.map((item) => {
      const updatedItem = {};
      Object.keys(item).forEach((key, index) => {
        const updatedKey = fieldNames[index];
        if (updatedKey) {
          updatedItem[updatedKey] = item[key];
        }
      });
      fieldNames.forEach((updatedKey, index) => {
        if (updatedKey === "indispenssable") {
          delete updatedItem[index]; // Supprimer la clé
          delete updatedItem[updatedKey]; // Supprimer la valeur correspondante
        }
      });
      return updatedItem;
    });

    try {
      const response = await axios.post("https://pim-nyun.onrender.com/api/fournisseur/resave", {
        data: updateDatascop,
        collectionName: collectionName,
      });
    console.log("succes resauvgarde ",response.data);
      setPlein(true)
    } catch (error) {
      console.error("Erreur lors de la resauvegarde des données :", error);
    }
  };

  const handleFile = (e) => {
    
    return new Promise((resolve, reject) => {
      const file = e.target.files[0];
      console.log("du fournisseur",file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const decoder = new TextDecoder("iso-8859-1");
        const fileContent = decoder.decode(content);

        const stringWithoutAccents = fileContent
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        Papa.parse(stringWithoutAccents, {
          header: true,
          encoding: "UTF-8",
          skipEmptyLines: true,
          worker: true,

          complete: (results) => {
            const dataNoFilter = results.data;
            // Filtrer les objets où 'sku' est vide
            let filteredData = [];
            if (dataNoFilter) {
              filteredData = dataNoFilter.filter((item) => {
                for (let key in item) {
                  if (item.hasOwnProperty(key) && item[key] === "") {
                    return false;
                  }
                }
                return true;
              });
            }
            //nom des proprieter
            const propertyNames =
              filteredData.length > 0 ? Object.keys(filteredData[0]) : [];
            setKeyNames(propertyNames);

            console.log("donne filtrer :", filteredData);
            console.log("keyNames :", propertyNames);

            resolve(filteredData); // Résoudre la promesse lorsque le traitement est terminé
          },
          error: (error) => {
            console.error("Erreur lors de l'analyse du fichier CSV :", error);
            reject(error); // Rejeter la promesse en cas d'erreur
          },
        });
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleDelete = async() =>{
    try {
      const response = await axios.post("https://pim-nyun.onrender.com/api/fournisseur/deleteId", {
        collectionName: collect,
      });
      console.log("reponse a la suppresssion : ",response.data);
      setPlein(false)
    } catch (error) {
      console.error(`Erreur lors de la supprime du contenu de ${collect} :`, error);
    }
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        
        p={1}
        sx={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          transition: "box-shadow 0.3s ease",
          boxShadow: "2px 2px 6px rgba(130, 206, 249, 1.5);",
          "&:hover": {
          boxShadow: "4px 4px 8px rgba(130, 206, 249, 2)",
          
        },
      }}
      >

        <Grid item xs={4}>
          <Typography variant="h7" fontFamily={"cursive"}>{collectionName}</Typography>
        </Grid>

        <Grid item xs={4} sx={{ borderLeft: "solid 1px", textAlign: "center" }}>
          {plein ? 
          <CheckCircleIcon
              sx={{ color: "green", "&:hover": { transform: "scale(1.1)" } }}
            />
           : 
              <CancelIcon
                sx={{ color: "red", "&:hover": { transform: "scale(1.1)" } }}
              />
          }
        </Grid>

        <Grid item xs={4} sx={{ borderLeft: "solid 1px", textAlign: "center" }}>
          {plein ? 
           <IconButton
           onClick={handleDelete}
           sx={{
            "&.MuiIconButton-root": {
              borderRadius: "50%", // Définir le fond du IconButton comme rond, // Définir la couleur de fond comme rouge
              " &:active": {
              backgroundColor: "rgba(255, 0, 0, 0.2)", // Définir la couleur de fond au survol et au clic comme rouge
              },
            },
    
           }}
         >
            <DeleteIcon
              sx={{ color: "red", "&:hover": { transform: "scale(1.1)" } }}
              
            />
            </IconButton>
           : 
            <Box sx={{  textAlign: "center" }}>
              <div>
                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    style={{ display: "none" }}
                    onChange={handleReSave}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      borderRadius: "20px",
                      backgroundColor: "#82CEF9",
                      color: "white",
                    }}
                  >
                    <div>Choose File</div>
                  </Button>
                </label>
              </div>
            </Box>
          }
        </Grid>
      </Grid>
    </>
  );
};
export default Fournisseur;
