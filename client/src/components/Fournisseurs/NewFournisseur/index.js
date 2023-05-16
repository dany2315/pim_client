import { useState } from "react";
import Papa from "papaparse";


import {
  Grid,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

const NewFournisseur = () => {

  const [keyNames, setKeyNames] = useState([]);
  //objet modifiedNames et l'object ou son regrouper les changement
  //de keyName du menu deroulant avec l'index du changement qui est
  //en fonction de l'index qui recoit du mapim de keyNames
  const [modifiedNames, setModifiedNames] = useState({});


  //fonction qui set la const ModifiedNames avec l'index du keyNames map 
  //et la value du select
  const handleNameChange = (e, index) => {
    const { value } = e.target;
    setModifiedNames((prevNames) => ({
      ...prevNames,
      [index]: value,
    }));
  };

  //fonction qui fais les changement des keyName avec le modifiedNames
  const handleSave = () => {
    const updatedKeyNames = keyNames.map(
      (keyName, index) => modifiedNames[index] || keyName
    );
    console.log(updatedKeyNames);
  };


  //fonction pour upload le fichier csv grace a papaparse
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

  

    reader.onload = (e) => {
      const content = e.target.result;
      const decoder = new TextDecoder('iso-8859-1');
      const fileContent = decoder.decode(content);
  
      const stringWithoutAccents = fileContent
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
  
      Papa.parse(stringWithoutAccents, {
        header: true,
        encoding:"UTF-8",
        skipEmptyLines: true,
        worker: true,
  
        complete: (results) => {
          const  data = results.data;
          console.log("Données originales :", data);

          

          // Filtrer les objets où 'sku' est vide
          const filteredData = data.filter((item) => {
            for (let key in item) {
              if (item.hasOwnProperty(key) && item[key] === '') {
                return false;
              }
            }
            return true;
          });



          //nom des proprieter
          const propertyNames =
            filteredData.length > 0 ? Object.keys(data[0]) : [];
          setKeyNames(propertyNames);

          


        
          

          console.log("donne filtrer :", filteredData);
          console.log("nom de key :", propertyNames);
        },
        error: (error) => {
          console.error("Erreur lors de l'analyse du fichier CSV :", error);
        },
      });
    };

    
  reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <div>
        <label htmlFor="file-upload">
          <input
            id="file-upload"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: "none" }}
            onChange={handleFileUpload}
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
            Choose File
          </Button>
        </label>
      </div>

      {keyNames.length === 0
        ? null
        : keyNames.map((keyName, index) => (
            <Grid container spacing={2} key={index}>
              {console.log("liste de key 1 :", keyNames)}
              {console.log("liste modifie :", modifiedNames)}
              <Grid item xs={6}>
                <Typography>{keyName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 120, marginTop: "16px" }}>
                  <InputLabel id="select-filtre-label">remplacer</InputLabel>
                  <Select
                    labelId="select-filtre-label"
                    id="select-filtre"
                    label="remplacer"
                    value={modifiedNames[index] || ""}
                    onChange={(e) => handleNameChange(e, index)}
                  >
                    <MenuItem value="SKU">SKU</MenuItem>
                    <MenuItem value="Reference">Reference</MenuItem>
                    <MenuItem value="Prix">Prix</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ))}

      <Button onClick={handleSave}>sauvgarder</Button>
    </>
  );
};
export default NewFournisseur;
