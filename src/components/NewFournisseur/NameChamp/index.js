import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from "@mui/material";

const NameChamp = ({ keyName, index, onNameChange, modifiedNames }) => {
  return (
    <>
      <Grid
        container
        sx={{
          borderColor: "grey",
          border: "solid 0.5px",
          borderRadius: 3,
          mb: 1,
          py: 1,
          "&:hover": {
            boxShadow: "0 4px  rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Grid item xs={6} sm={6} sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h7" color={"#82CEF9"} fontFamily={"cursive"}>{keyName}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: "center" }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="select-filtre-label">remplacer</InputLabel>
            <Select
              labelId="select-filtre-label"
              id="select-filtre"
              label="remplacer"
              value={modifiedNames[index] || ""}
              onChange={(e) => onNameChange(e, index)}
            >
              <MenuItem value="">Aucun changement</MenuItem>
              <MenuItem value="reference">reference</MenuItem>
              <MenuItem value="stock">stock</MenuItem>
              <MenuItem value="prix">prix</MenuItem>
              <MenuItem value="non_necessaire">non necessaire</MenuItem>
              

            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
export default NameChamp;
