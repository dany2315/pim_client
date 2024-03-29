import React from 'react';
import { Box, Typography } from '@mui/material';

const disponibiliteStyle = {
  color: '#fff',
  padding: '5px',
  borderRadius: '5px',
};

function Produit({ collectionName, prix,  stock }) {

  const disponibilite = stock > 0 ?true:false
  

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px  rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{fontWeight: 'bold'}}>{collectionName}</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
        <Typography variant="body1">{prix} €</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2">{stock} ARTICLES</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
       <Typography
        variant="body1"
        style={{
          ...disponibiliteStyle,
          backgroundColor: disponibilite ? '#4caf50' : '#f44336',
        }}
      >
        {disponibilite ? 'Disponible' : 'Indisponible'}
      </Typography>
      </Box>
      
    </Box>
  );
}

export default Produit;
