import { useState } from "react";
import { Button, Input, useMediaQuery } from "@mui/material";


const divStyles = {
  marginTop:'20px'
}


const Search = ({ onSearch }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [value, setvalue] = useState();

  const handleChange = (event) => {
    setvalue(event.target.value);
    
  };

  const handleClick = () => {
    console.log(value);
   onSearch(value);
  };

  return (
    <div style={divStyles}>
      <Input
        sx={{
          width: isMobile ? 150 : 200,
          flexGrow: 1,
          height: "32px",
          marginRight: isMobile ? 2 : "8px",
        }}
        onChange={(e) => handleChange(e)}
      />
      <Button
        variant="contained"
        sx={{
          height: "28px",
          minWidth: "80px",
        }}
        onClick={handleClick}
      >
        search
      </Button>
    </div>
  );
};

export default Search;
