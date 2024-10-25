import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Container } from 'react-bootstrap';
import Crafts_1 from '../../assets/images/Craft-1.png'
import Crafts_2 from '../../assets/images/Craft-2.png'
import Crafts_3 from '../../assets/images/Craft-3.png'


const Craftsmanship = ({isMobile}) => {
    return (
        <Container className='bg-Craftsmanship' component="div">
            <Box className='craftBackground' sx={{ marginTop: 15 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img loading="lazy"
                            src={Crafts_1}
                            alt="craftmanship"
                            className="craft-img"
                        />
                    </Grid>
                    <Grid className='craftContent' item xs={12} md={6}>
                        <Box className='craftConText'>
                            <Typography variant="h6" component="div" gutterBottom className='craft-text'
                                sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                                Why Choose Pure Bliss?
                            </Typography>
                            <Typography variant="h6" component="div" gutterBottom className='craft-text'
                                sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                                Premium Quality Ingredients
                            </Typography>
                            <Typography variant="body1" gutterBottom className='craft-text-2' sx={{fontFamily: 'pureblissPoppinsLight'}}>
                            At Pure Bliss, we are committed to providing only the finest quality incense. 
                            Our products are crafted from pure, natural ingredients sourced from around the world. 
                            From our Cup Sambrani made from pure Benzoin from Indonesia to our Masala Bathi crafted with natural ingredients, 
                            each product is designed to deliver an exceptional aromatic experience.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                  {/* <Grid container spacing={4}>
                 
                  <Grid className='craftContent' item xs={12} md={6}>
                      <Box className='craftConText'>
                          <Typography variant="h6" component="div" gutterBottom className='craft-text'
                              sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                              Why Choose Pure Bliss?
                          </Typography>
                          <Typography variant="h6" component="div" gutterBottom className='craft-text'
                              sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                              Premium Quality Ingredients
                          </Typography>
                          <Typography variant="body1" gutterBottom className='craft-text-2' sx={{fontFamily: 'pureblissPoppinsLight'}}>
                          At Pure Bliss, we are committed to providing only the finest quality incense. 
                          Our products are crafted from pure, natural ingredients sourced from around the world. 
                          From our Cup Sambrani made from pure Benzoin from Indonesia to our Masala Bathi crafted with natural ingredients, 
                          each product is designed to deliver an exceptional aromatic experience.
                          </Typography>
                      </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <img loading="lazy"
                          src={`${process.env.PUBLIC_URL}/main-images/Craft-1.png`}
                          alt="craftmanship"
                          className="craft-img"
                      />
                  </Grid>
              </Grid> */}


            </Box>

            <Box sx={{ marginTop: 15}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box className='craftConText-2'>

                            <Typography variant="h6" component="div" gutterBottom className='craft-text'
                                sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                                Authentic and Traditional
                            </Typography>
                            <Typography variant="body1" gutterBottom className='craft-text-2' sx={{fontFamily: 'pureblissPoppinsLight'}}>
                            We honour the rich incense-making traditions by using age-old techniques combined with modern advancements. 
                            Our Cup Sambrani offers a captivating fragrance and brings medicinal benefits, 
                            including mild sedative properties that promote relaxation and well-being.
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img loading="lazy"
                            src={Crafts_2}
                            alt="craftmanship"
                            className="craft-img"
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ marginTop: 15 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img loading="lazy"
                            src={Crafts_3}
                            alt="craftmanship"
                            className="craft-img"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box className='craftConText'>
                            <Typography variant="h6" component="div" gutterBottom className='craft-text'
                                sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                                Wide Range of Products
                            </Typography>
                            <Typography variant="body1" gutterBottom className='craft-text-2'sx={{fontFamily: 'pureblissPoppinsLight'}}>
                            Pure Bliss offers a diverse range of incense products to cater to your every need. 
                            Whether you prefer thicker or thinner sticks, cones, or our unique Cup Sambrani-Dhoop, our collection ensures there is something for everyone. 
                            Each product is designed for ease of use, with long-lasting burn times ranging from 45 minutes to 1 hour.
                            </Typography>
                        </Box>

                    </Grid>
                </Grid>
                
                {/* ) :(
                    <Grid container spacing={4}>
                    
                    <Grid item xs={12} md={6}>
                        <Box className='craftConText'>
                            <Typography variant="h6" component="div" gutterBottom className='craft-text'
                                sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                                Wide Range of Products
                            </Typography>
                            <Typography variant="body1" gutterBottom className='craft-text-2'sx={{fontFamily: 'pureblissPoppinsLight'}}>
                            Pure Bliss offers a diverse range of incense products to cater to your every need. 
                            Whether you prefer thicker or thinner sticks, cones, or our unique Cup Sambrani-Dhoop, our collection ensures there is something for everyone. 
                            Each product is designed for ease of use, with long-lasting burn times ranging from 45 minutes to 1 hour.
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img loading="lazy"
                            src={`${process.env.PUBLIC_URL}/main-images/Craft-3.png`}
                            alt="craftmanship"
                            className="craft-img"
                        />
                    </Grid>
                </Grid>

                )} */}
            </Box>

            {/* <Box sx={{ marginTop: 15 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box className='craftConText-2'>
                            <Typography variant="h6" component="div" gutterBottom className='craft-text'
                                sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                                Creating an Exquisite Experience
                            </Typography>
                            <Typography variant="body1" gutterBottom className='craft-text-2'>
                                As a brand, we draw upon ancient Indian wisdom, reviving its powerful
                                knowledge passed down through the ages.
                                We trust and embrace Ayurvedic traditions, using them to create therapeutic
                                incense sticks that offer a blissful experience.
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img loading="lazy"
                            src={`${process.env.PUBLIC_URL}/main-images/craftmanship.png`}
                            alt="craftmanship"
                            className="craft-img"
                        />
                    </Grid>
                </Grid>
            </Box> */}
            <Box sx={{ marginTop: 15 }}>
                <Grid container spacing={4}>

                </Grid>
            </Box>
        </Container>
    );
};

export default Craftsmanship;



// import React from 'react'
// import { Box, Grid, Typography } from '@mui/material';

// const CraftShipt = () => {
//     return (
//         <>
//             <Box>
//                 <Grid container spacing={4}>
//                     <Grid>
//                         <img loading="lazy" src={`${process.env.PUBLIC_URL}/main-images/craftmanship.png`}
//                             alt="craftmanship"
//                             className='craft-img'/>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                         <Typography>
//                             Embracing Our Soil
//                         </Typography>
//                         <Typography>
//                             As a brand, we draw upon ancient Indian wisdom, reviving its powerful
//                             knowledge passed down through the ages.
//                             We trust and embrace Ayurvedic traditions, using them to create therapeutic
//                             incense sticks that offer a blissful experience
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </>
//     )
// }

// export default CraftShipt