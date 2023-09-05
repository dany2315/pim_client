import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
//react router
import {NavLink} from 'react-router-dom'

const loginButtonStyle = {
  backgroundColor: '#FF3366',
  color: '#FFFFFF',
  fontSize: '0.8rem',
  '&:hover': {
    backgroundColor: '#CC0052',
  },
};

const registerButtonStyle = {
  backgroundColor: '#82aff9',
  color: '#FFFFFF',
  fontSize: '0.8rem',
  '&:hover': {
    backgroundColor: '#8eb8fb',
  },
};

const menuLinkStyles = {
  color: '#333',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#8eb8fb',
  },
};

const activeMenuLinkStyles = {
  fontWeight: 'bold',
  backgroundColor: '#8eb8fb',
  color:'white',
};







function Navbar() {
  const menuArrays = [{nom:"fournisseurs",path:"/"},{nom:"rechercher",path:"/rechercher"}]
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
    <AppBar position="sticky" sx={{ backgroundColor: '#FFFFFF', color: 'hsl(217, 10%, 50.8%)' ,borderRadius:"10px" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <IconButton edge="start" sx={{ marginRight: 2 }} color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Button color="inherit" component={NavLink} to='/' sx={{ flexGrow: 1 }}>
            NET COMPUTER SERVICES
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
            sx={{ marginTop: '40px', transformOrigin: 'left top' , borderRadius:'20px'}}
          >
            {menuArrays.map((menuArray,index)=>
            <MenuItem
            key={index}
            component={NavLink}
            onClick={handleClose}
            to={menuArray.path}
            sx={{
              ...menuLinkStyles,
              '&.active': {
                ...activeMenuLinkStyles,
              },
            }}
          >{menuArray.nom}
          </MenuItem>
            )}
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



export default Navbar;






