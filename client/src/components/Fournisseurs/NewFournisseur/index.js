import { useState } from "react";
import Papa from "papaparse";

import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Grid,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Container,
  Box,
} from "@mui/material";

const NewFournisseur = () => {
  const [keyNames, setKeyNames] = useState([]);
  //objet modifiedNames et l'object ou son regrouper les changement
  //de keyName du menu deroulant avec l'index du changement qui est
  //en fonction de l'index qui recoit du mapim de keyNames
  const [modifiedNames, setModifiedNames] = useState({});
  const [data, setData] = useState([])

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

    const csvContent = data;
    updateCSVFile(csvContent, updatedKeyNames);
    console.log("derniere liste :",updatedKeyNames);
  };

  

  const updateCSVFile = (csvContent, updatedFields) => {
    // Parsez le contenu CSV en un tableau d'objets
    const parsedData = Papa.parse(csvContent, { header: true }).data;
  
    // Parcourez chaque objet dans le tableau et mettez à jour les champs modifiés
    const updatedData = parsedData.map((row) => {
      const updatedRow = { ...row };
      Object.keys(updatedFields).forEach((field) => {
        if (updatedRow.hasOwnProperty(field)) {
          updatedRow[field] = updatedFields[field];
        }
      });
      return updatedRow;
    });
  
    // Convertissez les données mises à jour en une chaîne CSV
    const updatedCSV = Papa.unparse(updatedData, { header: true });
  
    console.log("Contenu CSV mis à jour :", updatedCSV);
  
    // Vous pouvez maintenant faire ce que vous voulez avec le contenu CSV mis à jour
  };
  

  const handleRemoveField = (index) => {
    setKeyNames((prevNames) => prevNames.filter((_, i) => i !== index));
    setModifiedNames((prevNames) => {
      const { [index]: _, ...newNames } = prevNames;
      return newNames;
    });
  };

  //fonction pour upload le fichier csv grace a papaparse
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
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
          setData(results.data) ;
          console.log("Données originales :", data);

          // Filtrer les objets où 'sku' est vide
          const filteredData = data.filter((item) => {
            for (let key in item) {
              if (item.hasOwnProperty(key) && item[key] === "") {
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
      <Container maxWidth="md">
        <Box sx={{ marginBottom: 2, marginTop: 2 }}>
          <Box sx={{ marginBottom: 2, textAlign: "right" }}>
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
          </Box>

          <Box
            sx={{
              marginBottom: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              borderColor: "black",
              padding: { xs: 2 },
            }}
          >
            <Grid container spacing={2}>
              {keyNames.length === 0
                ? null
                : ((
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      sx={{ textAlign: "center", marginBottom: 3 }}
                    >
                      <Typography>
                        Liste des champs du fichier CSV importer
                      </Typography>
                    </Grid>
                  ),
                  keyNames.map((keyName, index) => (
                    <>
                      {console.log("liste de key 1 :", keyNames)}
                      {console.log("liste modifie :", modifiedNames)}
                      <Grid item xs={2} sm={4} sx={{ textAlign: "center" }}>
                        <Typography>{keyName}</Typography>
                      </Grid>
                      <Grid item xs={8} sm={4} sx={{ textAlign: "center" }}>
                        <FormControl sx={{ minWidth: 120 }}>
                          <InputLabel id="select-filtre-label">
                            remplacer
                          </InputLabel>
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
                      <Grid
                        item
                        xs={2}
                        sm={4}
                        sx={{ textAlign: { sm: "center" } }}
                      >
                        <IconButton
                          onClick={() => handleRemoveField(index)}
                          sx={{ color: red[500] }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </>
                  )))}
            </Grid>
          </Box>
          <Box>
            <Button onClick={handleSave}>sauvgarder</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default NewFournisseur;
