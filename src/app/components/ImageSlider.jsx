import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ImageSlider({ images }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        appendDots: dots => (
            <Box
                style={{
                    bottom: '20px',
                    textAlign: 'center',
                    position: 'absolute',
                    width: '100%',
                    color: '#fff'
                }}
            >
                <ul style={{ margin: '0', padding: '0' }}> {dots} </ul>
            </Box>
        )
    };

    return (
        <Box sx={{ width: '100%', margin: 'auto' }}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <Box key={index} className="background-image">
                        <img loading="lazy"
                            src={image.src}
                            alt={image.alt}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};


// import React from 'react';
// import Slider from 'react-slick';
// import { Box } from '@mui/material';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const ImageSlider = ({ images }) => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//     };

//     return (
//         <Box sx={{ width: '100%',  margin: 'auto' }}>
//             <Slider {...settings}>
//                 {images.map((image, index) => (
//                     <Box key={index} className="background-image">
//                         <img loading="lazy"
//                             src={image.src}
//                             alt={image.alt}
//                             // style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                         />
//                     </Box>
//                     // <Box key={index} sx={{ position: 'relative', width: '100%', height: '400px' }}>
//                     //     <img loading="lazy"
//                     //         src={image.src}
//                     //         alt={image.alt}
//                     //         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                     //     />
//                     // </Box>
//                 ))}
//             </Slider>
//         </Box>
//     );
// };

// export default ImageSlider;
