import { Grid, Typography ,Paper} from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }));


const Fournisseur = ({ nom, distance, articles }) => {

  const nameChamps = ["ean", "sku", "prix", "ref", "refZERTDFGDFG", "ref", "ref", "ref", "ref"];
  
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
        <Grid item xs={6} >

          
          <Typography>distance:{distance} km</Typography>
          <Typography>nombres d'articles:{articles}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            spacing={2}
            direction={"row"}
            justifyContent="center"
            alignItems="center"
            sx={{borderLeft:"1px solid"}}
          >
            <Grid item xs={12}>
               <Typography variant="subtitle1" align="center" xs={12}>Les noms des champs</Typography>
               </Grid>
            {nameChamps.map((skill, index) => (
              <Grid item xs="auto" key={index} sx={{padding:"0 !important" ,borderRadius:2 ,
               marginRight:2 ,mb:1 , boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
               transition: "box-shadow 0.3s ease",
               "&:hover": {
                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                 backgroundColor: "grey",
               },}}>
                <Item >{skill}</Item>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Fournisseur;
