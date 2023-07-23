import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import NewFournisseurFile from './NewFournisseurFile';
import NewFournisseurFtp from './NewFournisseurFtp';
import NewFournisseurUrl from './NewFournisseurUrl';


const NewFournisseur = () => {
  const [selectedOption, setSelectedOption] = useState('ftp');

  const options = [{name:'ftp',text:"Enregistrer par FTP" ,radius:'20px 0 0 20px'},{name:'file',text:"Enregistrer depuis un fichier local",radius:'0 0 0 0'},{name:'url',text:"Enregistrer depuis une URL",radius:'0 20px 20px 0'}]

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
  <>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {options.map((option,index)=>
        <Button
        key={index}
        sx={{
            marginBottom:5,
            border:0,
            borderRadius: option.radius,
            backgroundColor: selectedOption === option.name ? '#82aff9' : '#cadeff',
            color: 'white',
            '&:hover': {
              backgroundColor: '#8eb8fb',
              border:0,
            },
          }}
        component="span"
        variant={selectedOption === option.name ? 'contained' : 'outlined'}
        onClick={() => handleOptionSelect(option.name)}
      >
        {option.text}
      </Button>
        )}
      
    </Box>
    <>
      {selectedOption === 'ftp' && (
       
         <NewFournisseurFtp/>
        
      )}

      {selectedOption === 'file' && (
       
          <NewFournisseurFile/>
       
      )}

      {selectedOption === 'url' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <NewFournisseurUrl/>
        </Box>
      )}
      
</>
</>
  );
};

export default NewFournisseur;
