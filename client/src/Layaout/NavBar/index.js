import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <IconButton edge="start" sx={{ marginRight: 2 }} color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Button color="inherit" sx={{ flexGrow: 1 }}>
            MonLogo
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{ marginTop: '40px', transformOrigin: 'left top' }}
          >
            <MenuItem onClick={handleClose}>Accueil</MenuItem>
            <MenuItem onClick={handleClose}>Produits</MenuItem>
            <MenuItem onClick={handleClose}>Contact</MenuItem>
          </Menu>
        </div>
        <div>
          {isMobile ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
              <Button variant="contained" sx={{ ...loginButtonStyle, width: '70px' , py: '1px' }}>
                login
              </Button>
              <Button variant="contained" sx={{ ...registerButtonStyle, width: '70px' , py: '1px' }}>
              Sign up
              </Button>
            </div>
          ) : (
            <>
              <Button variant="contained" sx={loginButtonStyle}>
                Login
              </Button>
              <Button variant="contained" sx={{ ...registerButtonStyle, marginLeft: '10px' }}>
              Sign up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

const loginButtonStyle = {
  backgroundColor: '#FF3366',
  color: '#FFFFFF',
  fontSize: '0.8rem',
  '&:hover': {
    backgroundColor: '#CC0052',
  },
};

const registerButtonStyle = {
  backgroundColor: '#66CCFF',
  color: '#FFFFFF',
  fontSize: '0.8rem',
  '&:hover': {
    backgroundColor: '#0088CC',
  },
};

export default Navbar;






