import { useState, useEffect,useContext } from "react";
import { Grid, Typography, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import api from "../../../../utils/Axios";
import { HandleRefreshFtp } from "../../../logique/RefreshImportFtp";
import { SnackbarContext } from "../../../../context/snackbarContext";
import { LoadingContext } from "../../../../context/loadingContext";



const FournisseurFtp = ({ fournisseur }) => {
  const { showSnackbar } = useContext(SnackbarContext);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [time, setTime] = useState("");
  const collect = fournisseur.collectionName;


  useEffect(() => {
    GetTimeMaj();
  }, []);

  const GetTimeMaj = async () => {
    try {
      const reponse = await api.get(`/fournisseur/ftp/${collect}`);
      const date = new Date(reponse.data);
      const jour = date.getDate();
      const mois = date.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
      const annee = date.getFullYear();
      const heures = date.getHours();
      const minutes = date.getMinutes();
      const dateFormatee = `${jour.toString().padStart(2, "0")}/${mois
        .toString()
        .padStart(2, "0")}/${annee.toString().slice(2)}   ${heures
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      setTime(dateFormatee);
      console.log(`reponse data ${collect} `, reponse.data);
    } catch (error) {
      console.log("erreur lors de la recup plein ", error);
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
        <Grid item xs={4} overflow={"auto"}>
          <Typography variant="h7" fontFamily={"cursive"}>
            {fournisseur.collectionName}
          </Typography>
        </Grid>

        <Grid item xs={4} sx={{ borderLeft: "solid 1px", textAlign: "center" }}>
          <Button
            sx={{
              w: 0.5,
              pr: 0,
              color: "green", // Couleur du texte en blanc
              bgcolor: "white", // Couleur de fond en vert
              boxShadow: "1px 2px 2px 1px",
              textAlign: "center",
              "&:hover": {
                bgcolor: "darkgreen", // Couleur de fond au survol en vert foncé
                color: "white",
              },
            }}
            startIcon={<RefreshIcon />} // Utilisez l'icône de rafraîchissement
            size="small" // Vous pouvez ajuster la taille selon vos besoins
            onClick={async()=>(await HandleRefreshFtp(fournisseur ,showSnackbar ,showLoading, hideLoading),GetTimeMaj())}
          ></Button>
        </Grid>
        <Grid item xs={4} sx={{ borderLeft: "solid 1px", textAlign: "center" }}>
          <Typography  fontFamily={"cursive"} sx={{fontSize:"13px"}}>
            {time}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default FournisseurFtp 
