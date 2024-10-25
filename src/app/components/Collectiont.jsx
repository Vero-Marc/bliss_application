import React from 'react'
import { Box, Grid, Typography } from '@mui/material';
import { Container } from 'react-bootstrap';

import CollectionPage from '../../assets/images/collectionPage-2.png'
import CollectionPage_2 from '../../assets/images/collectionPage-1.png'
import CollectionPage_3 from '../../assets/images/collectionPage-3.png'



function Collectiont({isMobile}) {
  return (
    <Container className='bg-Craftsmanship' component="div">
    <Box className='craftBackground' sx={{ marginTop: 15 }}>
       <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <img loading="lazy"
                    // height={50}
                    src={CollectionPage}
                    alt="craftmanship"
                    className="craft-img"
                />
            </Grid>
            <Grid className='craftContent' item xs={12} md={8}>
                <Box className='craftConText'>
                    <Typography variant="h6" component="div" gutterBottom className='craft-text'
                        sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                        Cup Sambrani - Dhoop:
                    </Typography>
                    <Typography variant="body1" gutterBottom className='craft-text-2' sx={{fontFamily: '"pureblissPoppinsLight", serif' ,fontWeight:500}} >
                    Experience the traditional and medicinal value of Cup Sambrani, also known as Sambrani or loban. 
                    Sourced from the Styrax tree, our Cup Sambrani is known for its purifying and fragrant properties.
                    Commonly used in Hindu and Buddhist ceremonies, Cup Sambrani purifies the air, drives out negative energies, 
                    and creates a peaceful atmosphere. It is also believed to have medicinal properties, such as relieving stress and anxiety. 
                    Use Cup Sambrani to create a calming and spiritual ambience, making it perfect for meditation, yoga, 
                    and other mindfulness practices.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
        {/* ):(
                 <Grid container spacing={4}>
                
                 <Grid className='craftContent' item xs={12} md={8}>
                     <Box className='craftConText'>
                         <Typography variant="h6" component="div" gutterBottom className='craft-text'
                             sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                             Cup Sambrani - Dhoop:
                         </Typography>
                         <Typography variant="body1" gutterBottom className='craft-text-2' sx={{fontFamily: '"pureblissPoppinsLight", serif' ,fontWeight:500}} >
                         Experience the traditional and medicinal value of Cup Sambrani, also known as Sambrani or loban. 
                         Sourced from the Styrax tree, our Cup Sambrani is known for its purifying and fragrant properties.
                         Commonly used in Hindu and Buddhist ceremonies, Cup Sambrani purifies the air, drives out negative energies, 
                         and creates a peaceful atmosphere. It is also believed to have medicinal properties, such as relieving stress and anxiety. 
                         Use Cup Sambrani to create a calming and spiritual ambience, making it perfect for meditation, yoga, 
                         and other mindfulness practices.
                         </Typography>
                     </Box>
                 </Grid>
                 <Grid item xs={12} md={4}>
                     <img loading="lazy"
                         // height={50}
                         src={`${process.env.PUBLIC_URL}/main-images/collectionPage-2.png`}
                         alt="craftmanship"
                         className="craft-img"
                     />
                 </Grid>
             </Grid>
            
        )} */}
    </Box>

    <Box sx={{ marginTop: 15}}>
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Box className='craftConText-2'>
                    <Typography variant="h6" component="div" gutterBottom className='craft-text'
                        sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                         Why Choose Charcoal-Free Agarbattis?
                    </Typography>
                    <Typography variant="body1" gutterBottom className='craft-text-2' sx={{fontFamily: '"pureblissPoppinsLight", serif',fontWeight:500}} >
                    Choosing charcoal-free agarbattis offers a cleaner, healthier, and more sustainable way to enjoy 
                    the benefits of incense sticks. By minimizing their environmental impact, 
                    these incense sticks provide a superior aromatic experience while promoting better air quality and overall well-being.
                    </Typography>
                </Box>

            </Grid>
            <Grid item xs={12} md={6}>
                
                <img loading="lazy"
                    src={CollectionPage_2}
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
                    src={CollectionPage_3}
                    alt="craftmanship"
                    className="craft-img"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Box className='craftConText'>
                    <Typography variant="h6" component="div" gutterBottom className='craft-text'
                        sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                        Pure incense sticks - Charcoal-Free:
                    </Typography>
                    <Typography variant="body1" gutterBottom className='craft-text-2' sx={{fontFamily: '"pureblissPoppinsLight", serif',fontWeight:500}}>
                    Our traditional and natural incense sticks are crafted with love and care, using only the finest ingredients and time-honored techniques. Made from sustainably sourced woods, herbs, and essential oils.
                    Our incense sticks burn smoothly and evenly for 45 minutes to 1 hour , releasing a gentle, soothing aroma that calms the mind and uplifts the spirit.
                    </Typography>
                </Box>

            </Grid>
        </Grid>
        {/* ) : (
            <Grid container spacing={4}>
           
            <Grid item xs={12} md={6}>
                <Box className='craftConText'>
                    <Typography variant="h6" component="div" gutterBottom className='craft-text'
                        sx={{ fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                        Pure incense sticks - Charcoal-Free:
                    </Typography>
                    <Typography variant="body1" gutterBottom className='craft-text-2' sx={{fontFamily: '"pureblissPoppinsLight", serif',fontWeight:500}}>
                    Our traditional and natural incense sticks are crafted with love and care, using only the finest ingredients and time-honored techniques. Made from sustainably sourced woods, herbs, and essential oils.
                    Our incense sticks burn smoothly and evenly for 45 minutes to 1 hour , releasing a gentle, soothing aroma that calms the mind and uplifts the spirit.
                    </Typography>
                </Box>

            </Grid>
            <Grid item xs={12} md={6}>
                <img loading="lazy"
                    src={`${process.env.PUBLIC_URL}/main-images/collectionPage-3.png`}
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
  )
}

export default Collectiont
