import { Grid, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import Papa from "papaparse";
import { useState, useEffect } from "react";

const Fournisseur = ({ collectionName, fieldNames }) => {
  const [keyNames, setKeyNames] = useState([]);
  const [file, setFile] = useState();
  const [plein, setPlein] = useState(false)

  useEffect(() => {
    const GetRempli = async () => {
     try {
      const response = await axios.get(`http://localhost:5000/api/fournisseur?id=${collectionName}`)
      console.log("get plein ",response.data);
      console.log();
      setPlein(response.data);
     } catch (error) {
      console.log("erreur lors de la recup plein " , error);
     }    
        
      };

      GetRempli()
}, [])


  const handleReSave = async (event) => {
    const updatedData = await handleFileUpload(event);
    console.log("liste key names ", keyNames);
    console.log("liste fieldNames : ", fieldNames);
    console.log("data : ",updatedData);
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
      await axios.post("http://localhost:5000/api/fournisseur/resave", {
        data: updateDatascop,
        collectionName:collectionName
      });
      
    } catch (error) {
      console.error("Erreur lors de la resauvegarde des données :", error);
    }
  };

  const handleFileUpload =  (event) => {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      setFile(file);
      console.log(file);
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
            console.log("nom de key du fichiers :", propertyNames);

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

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        bgcolor={"white"}
        p={1}
      >
        <Grid item xs={6}>
          <Typography variant="h5">{collectionName}</Typography>
        </Grid>

        <Grid item xs={6} sx={{ borderLeft: "solid 1px" }}>
          {file ? (
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
          ) : (
            <Box sx={{ marginBottom: 2, textAlign: "center" }}>
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
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default Fournisseur;
