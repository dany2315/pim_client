import { Grid, Typography, Paper, Box, Button } from "@mui/material";
import Papa from "papaparse";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Fournisseur = ({ nom, nombreArticles, champs }) => {
  const [keyNames, setKeyNames] = useState([]);
  const [data, setData] = useState([]);
  const [file, setFile] = useState();

  const handleFileUpload = (event) => {
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
            setData(filteredData);
          }
          //nom des proprieter
          const propertyNames =
            filteredData.length > 0 ? Object.keys(filteredData[0]) : [];
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

  const handleSave =  (event) => {
    handleFileUpload(event);
    console.log("liste key names ", keyNames);

    const updateDatascop = data.map((item) => {
      const updatedItem = {};
      Object.keys(item).forEach((key, index) => {
        const updatedKey = champs[index];
        if (updatedKey) {
          updatedItem[updatedKey] = item[key];
        }
      });
      champs.forEach((updatedKey, index) => {
        if (updatedKey === "indispenssable") {
          delete updatedItem[index]; // Supprimer la clé
          delete updatedItem[updatedKey]; // Supprimer la valeur correspondante
        }
      });
      return updatedItem;
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
        <Grid item xs={12}>
          <Typography variant="h5">{nom}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>nombres d'articles:{nombreArticles}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            spacing={2}
            direction={"row"}
            justifyContent="center"
            alignItems="center"
            sx={{ borderLeft: "1px solid" }}
          >
            <Grid item xs={12}>
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
                        onChange={handleSave}
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
            <Grid item xs={12} sx={{ padding: "0 !important" }}>
              <Typography variant="subtitle1" align="center" xs={12}>
                Les noms des champs:
              </Typography>
            </Grid>
            {champs.map((skill, index) => (
              <Grid
                item
                xs="auto"
                key={index}
                sx={{
                  padding: "0 !important",
                  borderRadius: 2,
                  marginRight: 2,
                  mb: 1,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "grey",
                  },
                }}
              >
                <Item>{skill}</Item>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Fournisseur;
