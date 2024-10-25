import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Container } from 'react-bootstrap';
import './Craftsmanship.css'; 
import CraftShipt from '../components/CraftShipt';

import Crafts from '../../assets/images/Crafts.png'
// import '../fonts.css';
// import LazyImage from '../components/LazyImage';
const Craftsmanship = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <Container className="craftsmanship-container" component="div">
      <Box className="craftsmanship-img">
      {/* <LazyImage
        src={`${process.env.PUBLIC_URL}/main-images/Crafts.png`} // High-resolution image
        alt="craftmanship"
        placeholderSrc="https://example.com/low-res-placeholder.jpg" // Low-res placeholder
        className="background-image"
      /> */}
        <img loading="lazy" src={Crafts} alt="craftmanship" className="background-image" />

        {/* <PlayCircleOutlineOutlinedIcon sx={{ fontSize: '5rem' }} className='playIcon' onClick={handleOpen} /> */}

      </Box>
      <Box className="textContent">
        <Typography  component="div" className='craft-text' variant="h6" 
        sx={{fontFamily: 'pureblissPoppinsLight' , 
          fontWeight: 600 ,
          marginTop:5,
          color: '#6B4226',
          textAlign:'center',
        //  fontSize: isMobile ? '1rem' :'1rem',

         paddingBottom: '20px',
         }}
       >
        At Pure Bliss, we believe in the power of pure, natural aromas to transform your environment and uplift your spirit. 
        Our journey began with a simple mission: to bring the highest quality incense to those who seek better health, spirituality, and peace in their daily lives
        </Typography>
        <CraftShipt isMobile={isMobile}/>

      </Box>

      {/* <Modal open={open} onClose={handleClose} aria-labelledby="video-modal" aria-describedby="video-modal-description">
        <Box className="modalStyle">
          <ReactPlayer src="path/to/your/video.mp4" width="720" height="420" controls />
        </Box>
      </Modal> */}
    </Container>
  );
};

export default Craftsmanship;

