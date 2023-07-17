import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { GoogleLoginButton } from 'react-social-login-buttons';


const LoginPage = () => {
  return (
    <div
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f8f8',
      }}
    >
      <Card
        sx={{
          width: '400px',
          display: 'flex',
          flexDirection: 'row',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <img src="../../assets/YOSI9794.jpg" alt="Company Logo" sx={{ height: '80px', marginBottom: '20px' }} />
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Connectez-vous à votre compte
          </Typography>
          <TextField label="Adresse e-mail" fullWidth sx={{ marginBottom: '20px' }} />
          <TextField label="Mot de passe" type="password" fullWidth sx={{ marginBottom: '20px' }} />
          <Button variant="contained" fullWidth sx={{ marginBottom: '20px' }}>
            Se connecter
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'grey' }}>
            Si vous n'avez pas de compte,{' '}
            <Link to="/register" sx={{ color: 'blue', textDecoration: 'none' }}>
              inscrivez-vous
            </Link>
          </Typography>
          <GoogleLoginButton fullWidth sx={{ marginTop: '20px' }} />
        </CardContent>
        <img src="../../assets/ncs-logo-final2.png" alt="Company Photo" sx={{ flex: 1, objectFit: 'cover' }} />
      </Card>
    </div>
  );
};

export default LoginPage;

