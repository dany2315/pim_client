import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import api from "../../../../utils/Axios";
import Papa from "papaparse";
//import context
import { SnackbarContext } from "../../../../context/snackbarContext";
import { LoadingContext } from "../../../../context/loadingContext";

const FournisseurFtp = ({ fournisseur }) => {

  const [keyNames, setKeyNames] = useState([]);
  const [time, setTime] = useState(false);
  const collect = fournisseur.collectionName;
  const { showSnackbar } = useContext(SnackbarContext);
  const { showLoading, hideLoading } = useContext(LoadingContext);

  useEffect(() => {
    GetTimeMaj();
  }, []);

  const GetTimeMaj = async () => {
    try {
      const reponse = await api.get(`/fournisseur/ftp/${collect}`);
      setTime(reponse.data);
      console.log(`reponse data ${collect} `, reponse.data);
    } catch (error) {
      console.log("erreur lors de la recup plein ", error);
    }
  };

  const importFtp = async () => {

    if (fournisseur.host && fournisseur.username && fournisseur.password && fournisseur.filName) {
      try {
        showLoading()
        console.log("value : ",  fournisseur.password, fournisseur.username , fournisseur.host , fournisseur.filNames);
        const response = await api.post("/fournisseur/ftp", {
          urlFtp: fournisseur.host,
          nomUtilis: fournisseur.username,
          pass: fournisseur.password,
          nameFile: fournisseur.filName,
        });
        hideLoading()
        showSnackbar("Importation par FTP reussi ","success")
        console.log("reponse ftp", response.data);
        return  response.data
      } catch (error) {
        console.log("error ftp", error);
        hideLoading()
        showSnackbar("Importation par FTP echouer !!", "error")
      }
    } else {
    }
    
  };

  const handleFile = (data) => {
  
    const dataNoFilter = data;
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
return filteredData
};

  const handleRefreshFtp = async () => {
    const data = await importFtp()
    const updatedData = handleFile(data);
    showLoading();
    console.log("liste key names ", keyNames);
    console.log("liste fieldNames : ", fournisseur.fieldNames);
    console.log("data : ", updatedData);
    //Sortir le data final en enlevant les champs et les valeur des
    //articles indispenssable et garder que les autre
    const updateDatascop = updatedData.map((item) => {
      const updatedItem = {};
      Object.keys(item).forEach((key, index) => {
        const updatedKey = fournisseur.fieldNames[index];
        if (updatedKey) {
          updatedItem[updatedKey] = item[key];
        }
      });
      fournisseur.fieldNames.forEach((updatedKey, index) => {
        if (updatedKey === "non_necessaire") {
          delete updatedItem[index]; // Supprimer la clé
          delete updatedItem[updatedKey]; // Supprimer la valeur correspondante
        }
      });
      return updatedItem;
    });

    try {
      const response = await api.post("/fournisseur/ftp/refreshFournisseurFtp", {
        data: updateDatascop,
        collectionName: fournisseur.collectionName,
      });
      console.log("succes resauvgarde ", response.data);
      hideLoading();
      showSnackbar("Mise a niveau effectuer !", "success");
    } catch (error) {
      hideLoading();
      showSnackbar("Mise a niveau echouer !", "error");
      console.error("Erreur lors de la resauvegarde des données :", error);
    }
  };

  
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        p={1}
        sx={{
          mt: 1,
          mb: 1,
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          transition: "box-shadow 0.3s ease",
          boxShadow: "2px 2px 6px rgba(142, 184, 251, 1.5);",
          "&:hover": {
            boxShadow: "4px 4px 8px rgba(116, 168, 251, 2)",
          },
        }}
      >
        <Grid item xs={4}>
          <Typography variant="h7" fontFamily={"cursive"}>
            {fournisseur.collectionName}
          </Typography>
        </Grid>

        <Grid item xs={4} sx={{ borderLeft: "solid 1px", textAlign: "center" }}>
          <Button sx={{
            w:0.5,
            pr:0,
            color: 'green', // Couleur du texte en blanc
            bgcolor: 'white', // Couleur de fond en vert
            boxShadow:"1px 2px 2px 1px",
            textAlign:"center",
            '&:hover': {
              bgcolor: 'darkgreen', // Couleur de fond au survol en vert foncé
              color:"white",
            },
          }}
            startIcon={<RefreshIcon />} // Utilisez l'icône de rafraîchissement
            size="small" // Vous pouvez ajuster la taille selon vos besoins
            onClick={handleRefreshFtp}
          >
           
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ borderLeft: "solid 1px", textAlign: "center" }}>
          <Typography variant="h8" fontFamily={"cursive"}>
            {time}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default FournisseurFtp;
