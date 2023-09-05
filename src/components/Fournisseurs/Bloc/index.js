import { useEffect, useState , useContext} from "react";
import api from "../../../utils/Axios";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import RefreshIcon from "@mui/icons-material/Refresh";
import Fournisseur from "./Fournisseur";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import FournisseurFtp from "./FournisseurFtp";
import { HandleRefreshFtp } from "../../logique/RefreshImportFtp";
import { SnackbarContext } from "../../../context/snackbarContext"
import { LoadingContext } from "../../../context/loadingContext";

const Bloc = (props) => {
  const { showSnackbar } = useContext(SnackbarContext);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const categorie = props.categorie;
  const [fournisseurs, setfournisseurs] = useState([]);

  useEffect(() => {
    const fetchFournisseur = async () => {
      try {
        const response = await api.post("/fournisseur", {
          id: categorie._id,
        });
        console.log("listFourn ajout", response.data);
        setfournisseurs(response.data);
      } catch (error) {
        console.log("erreur lors de la recuperations des fournisseurs", error);
      }
    };

    fetchFournisseur();
  }, []);

  
  const refreshFournisseurAllFtp = async () => {
      fournisseurs.map((fournisseur,index)=>
       HandleRefreshFtp(fournisseur ,showSnackbar ,showLoading, hideLoading))
  }

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={6}>
          <Typography variant="h5" color={"#8eb8fb"} fontFamily={"cursive"}>
            <FontAwesomeIcon icon={faServer} style={{ color: "#8eb8fb" }} />{" "}
            {categorie.name}
          </Typography>
        </Grid>
        {categorie.name == "ftp" ? (
          <Grid item xs={6} textAlign={"right"}>
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
              onClick={refreshFournisseurAllFtp}
              startIcon={<RefreshIcon />} // Utilisez l'icône de rafraîchissement
              size="small" // Vous pouvez ajuster la taille selon vos besoins
              // Autres props MUI peuvent être ajoutés ici
            ></Button>
          </Grid>

        ) : null}
      </Grid>
      {console.log("cat", categorie)}
      <Grid
        overflow={"auto"}
        sx={{
          border: 1,
          padding: 2,
          borderRadius: 3,
          borderColor: "#8eb8fb",
          height: "205px",
        }}
      >
        {fournisseurs.length === 0 ? (
          <Typography variant="body1">
            Aucun fournisseur a ete enregistrer.
          </Typography>
        ) : (
          <>
            {fournisseurs.map((fournisseur, index) =>
              categorie.name == "ftp" ? (
                <FournisseurFtp key={index} fournisseur={fournisseur} />
              ) : (
                <Fournisseur key={index} fournisseur={fournisseur} />
              )
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default Bloc;
