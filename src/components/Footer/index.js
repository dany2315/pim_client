import { Typography, Box, Link, useMediaQuery } from '@mui/material';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      sx={{
        borderRadius:"10px",
        backgroundColor: '#f5f5f5',
        padding: '16px',
        textAlign: 'center',
        marginTop: '24px',
        marginRight:"10px",
        marginLeft:"10px",

        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: isMobile ? '8px' : 0 }}>
        &copy; {new Date().getFullYear()} NCS Net Computer Service . Tous droits réservés.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ marginLeft: isMobile ? 0 : '8px' }}>
        Contact :{' '}
        <Link href="mailto:eserfaty@ncsfrance.com" color="inherit">
          eserfaty@ncsfrance.com
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ marginLeft: isMobile ? 0 : '8px' }}>
        Developper par : {' '}
        <Link href="mailto:davidserfaty2315@gmail.com" color="inherit">
          DavidDev
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
