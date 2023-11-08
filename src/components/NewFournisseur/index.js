import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import NewFournisseurFile from "./NewFournisseurFile";
import NewFournisseurFtp from "./NewFournisseurFtp";
import NewFournisseurUrl from "./NewFournisseurUrl";
import api from "../../utils/Axios";

const NewFournisseur = () => {
  const [selectedOption, setSelectedOption] = useState("ftp");
  const [options,setOptions] = useState([])
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const response = await api.get("/fournisseur/categories");
setOptions(response.data)
console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories()
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {options.map((option, index) => (
          <Button
            key={index}
            sx={{

              marginBottom: 5,
              border: 0,
              borderRadius: option.radius,
              backgroundColor:
                selectedOption === option.name ? "#82aff9" : "#cadeff",
              color: "white",
              fontSize:isMobile?10:15,
              "&:hover": {
                backgroundColor: "#8eb8fb",
                border: 0,
              },
            }}
            component="span"
            variant={selectedOption === option.name ? "contained" : "outlined"}
            onClick={() => handleOptionSelect(option.name)}
          >
            {option.text}
          </Button>
        ))}
      </Box>
      <>
        {selectedOption === "ftp" && <NewFournisseurFtp numId={options.find((option) => option.name === "ftp")?._id || null} />}

        {selectedOption === "file" && <NewFournisseurFile numId={options.find((option) => option.name === "file")?._id || null}/>}

        {selectedOption === "url" && <NewFournisseurUrl numId={options.find((option) => option.name === "url")?._id || null}/>}
      </>
    </>
  );
};

export default NewFournisseur;
