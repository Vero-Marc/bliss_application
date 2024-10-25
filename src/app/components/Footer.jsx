
import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import LogoForHome from '../../assets/images/LogoForHome.png'
// import { ReactComponent as CustomIcon } from './path/to/your/custom-icon.svg'; // Replace with the path to your custom SVG icon
import XIcon from '@mui/icons-material/X';
const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#ECE6D8',
        // py: 2,
        position: 'relative',
        bottom: 0,
        left: 0,
        borderTop: '1px solid #e0e0e0', // Optional: adds a top border
      }}
    >
      <Container maxWidth="lg" sx={{height:'auto'}}
      // sx={{
      //   backgroundImage: `url(${process.env.PUBLIC_URL}/main-images/home-footer.png)`,
      //   backgroundSize: 'contain', // or 'contain' depending on your need
      //   // backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   height: '200px', // Adjust height as needed
      //   // display: 'flex',
      //   // alignItems: 'center',
      //   // justifyContent: 'center',
      //   // color: 'white',
      //   textAlign: 'center',
      // }}
      >

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
           > 
            <img  loading="lazy"
                 src={LogoForHome} 
                  alt="Pure Bliss" 
                 style={{ width: '80%', maxWidth: '200px', height: 'auto', marginLeft:'20px' }} // Responsive size
                  
                  // style={{ height: '40px', marginRight: '8px' }} 
                  />
          </Box>

          {/* Links Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            <Link href="/terms" variant="body2" color="#74512D" underline="none" >
              Terms & Conditions
            </Link>
            <Link href="/returns" variant="body2" color="#74512D" underline="none">
              Returns & Cancellation Policy
            </Link>
            <Link href="/privacy" variant="body2" color="#74512D" underline="none">
              Privacy Policy
            </Link>
            <Link href="/shipping_policy" variant="body2" color="#74512D" underline="none">
              Refund & Shipping Policy
            </Link>
            {/* <Typography className="footer-text" variant="body2">Terms & Conditions</Typography>
       <Typography className="footer-text" variant="body2">Returns & Cancellation Policy</Typography>
      <Typography className="footer-text" variant="body2">Privacy Policy</Typography> */}
          </Box>

          {/* Social Icons Section */}
          <Box 
            sx={{
              display: 'flex',
              
              justifyContent: { xs: 'center', sm: 'flex-end' },
              gap: 1,
            }}
          >
            <IconButton href="#" color="inherit" aria-label="Custom" >
            <XIcon sx={{color:'#74512D'}} />
            </IconButton>
            <IconButton href="#" color="inherit" aria-label="Instagram" className="social-icons">
              <Instagram sx={{color:'#74512D'}}/>
            </IconButton>
            <IconButton href="#" color="inherit" aria-label="Facebook" className="social-icons">
              <Facebook sx={{color:'#74512D'}}/>
            </IconButton>
          </Box>
        </Box>

        {/* Copyright Section */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center" className="copyRight footer-text"
          sx={{ mt: 2 }}
        >
          &copy; All Rights Reserved 2024
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

