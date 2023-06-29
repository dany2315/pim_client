import { Typography, Box, Link, useMediaQuery } from '@mui/material';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '16px',
        textAlign: 'center',
        marginTop: '24px',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: isMobile ? '8px' : 0 }}>
        &copy; {new Date().getFullYear()} NCS Net Computer Service . Tous droits réservés.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ marginLeft: isMobile ? 0 : '16px' }}>
        Contact :{' '}
        <Link href="mailto:eserfaty@ncsfrance.com" color="inherit">
          eserfaty@ncsfrance.com
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
