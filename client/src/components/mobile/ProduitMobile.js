import React from 'react';
import { Typography, Paper } from '@mui/material';

const produitStyle = {
  padding: '20px',
  borderRadius: '10px',
  margin: '10px',
};

const referenceStyle = {
  fontWeight: 'bold',
};

const disponibiliteStyle = {
  color: '#fff',
  padding: '5px',
  borderRadius: '5px',
};

function ProduitMobile({ collectionName, prix,  stock  }) {

  const disponibilite = stock > 0 ?true:false

  return (
    <Paper
      elevation={3}
      sx={{
        ...produitStyle,
        backgroundColor: 'white',
        '&:hover': {
          boxShadow: '0 4px  rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Typography variant="h6" sx={referenceStyle}>
        {collectionName}
      </Typography>
      <Typography variant="body1">Prix: {prix} €</Typography>
      <Typography variant="body1">Stock: {stock}</Typography>
      <Typography
        variant="body1"
        sx={{
          ...disponibiliteStyle,
          backgroundColor: disponibilite ? '#4caf50' : '#f44336',
        }}
      >
        {disponibilite ? 'Disponible' : 'Indisponible'}
      </Typography>
      
    </Paper>
  );
}

export default ProduitMobile;
