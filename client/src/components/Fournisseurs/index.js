import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Papa from "papaparse";
import NewFournisseur from "../NewFournisseur";
import FournisseurMobile from "../mobile/FournisseurMobile";
import Fournisseur from "./Fournisseur";
import axios from "axios";

function Fournisseurs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [fournisseurs, setfournisseurs] = useState([]);
  const [file, setFile] = useState([]);
  const [data, setData] = useState([]);
  const [keyNames, setKeyNames] = useState([]);

  useEffect(() => {
    const fetchFournisseur = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fournisseur"
        );
        console.log("azert", response.data);
        setfournisseurs(response.data);
      } catch (error) {
        console.log("erreur lors de la recuperations des fournisseurs", error);
      }
    };

    fetchFournisseur();
  }, []);


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
          console.log(results.data);
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

  return (
    <>
      {keyNames.length === 0 ? (
        <Container maxWidth="md">
          <Typography variant="h5">Liste des Fournisseurs</Typography>

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
                  <div>Nouveau fournisseur</div>
                </Button>
              </label>
            </div>
          </Box>

          <Grid
            container
            spacing={2}
            direction="column"
            sx={{ marginTop: "16px" }}
          >
            {fournisseurs.length === 0 ? (
              <Typography variant="body1">
                Aucun fournisseur a ete enregistrer.
              </Typography>
            ) : (
              fournisseurs.map((fournisseur, index) => (
                <Grid item xs={2} key={index}>
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
                      (console.log(isMobile),
                      (
                        <FournisseurMobile
                          collectionName={fournisseur.collectionName}
                          fieldNames={fournisseur.fieldNames}
                        />
                      ))
                    ) : (
                      <Fournisseur
                        collectionName={fournisseur.collectionName}
                        fieldNames={fournisseur.fieldNames}
                      />
                    )}
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      ):(
        <>
          {console.log(keyNames)}
          <NewFournisseur file={file} data={data} keyNames={keyNames}  />
        </>
      ) 
      }
    </>
  );
}

export default Fournisseurs;
