// CarouselComponent.jsx
import React from 'react';
import Slider from 'react-slick';
import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import '../../components/cartSlider/cartSlider.css';
import './style/ProductView.css'

const CarouselComponent = ({selectedImage, images, open, onClose }) => {
  

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="md"
    sx={{
      '& .MuiDialog-paper': {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
        width: '100%',
        // height: 'auto',
      },
    }}
  >
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <IconButton
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          color: 'white',
        }}
      >
        <CloseIcon />
      </IconButton>
      <Slider
        {...settings}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {images?.map((image, index) => (
          
          <div key={index} style={{ width: '100%', height: '100%' }}>
            <img loading="lazy"
              src={image.preview}
              alt={`Slide ${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Adjust if needed
                display: 'block',
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  </Dialog>
  );
};

export default CarouselComponent;
