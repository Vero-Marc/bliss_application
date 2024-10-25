import React from 'react';
import {
    Container,
    Grid,
    Card,
    Box,
    Typography,
    Button,
    IconButton,
    Link,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import './style/cart.css';
import './../../pages/shop.css';

import CartSlider from '../../components/cartSlider/CartSlider';


const CartPage = () => {
    const mainImage = "../main-images/shop.png";
    const thumbnailImages = [
        { src: "../main-images/shop-img.jpeg", alt: "Thumbnail 1" },
        { src: "../main-images/shop-img.jpeg", alt: "Thumbnail 1" },
        { src: "../main-images/shop-img.jpeg", alt: "Thumbnail 1" },
    ];
  
    
    return (
        <Container className="cart-section" maxWidth="mx">
            <Grid container spacing={4}>

                <Grid item xs={12} md={6}>
                    <Card className="product-image-card" sx={{ p: 2, background: 'none', boxShadow: 'none' }}>
                        <h1 className='cart-head'>
                            Sambrani Dhoop Cups
                        </h1>

                        <Box sx={{ display: 'flex', mb: 2 }}>
                            <Box className="main-image">
                                <img loading="lazy" src={mainImage} alt="Product" className="main-img" />
                            </Box>

                            <Box className="thumbnail-images" sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2 }}>
                                {thumbnailImages.map((image, index) => (
                                    <img loading="lazy" key={index} src={image.src} alt={image.alt} className="thumbnail-img" />
                                ))}
                            </Box>
                        </Box>

                        <h1 className='cart-head'>
                            Description
                        </h1>
                        <p className='cart-paragraph'>
                            Lorem ipsum dolor sit amet, qui autem dignissimos sed aliquid corporis est voluptatem nemo cum omnis porro aut consequatur magni et galisum quos. Et velit eligendi et soluta itaque qui omnis illum qui tenetur fugit ab delectus voluptas et repudiandae perspiciatis ab ipsam saepe. Et tempora mollitia et impedit nihil qui sequyi autem eos expedita illo sed nesciunt ducimus in quod voluptatem aut totam molestiae.
                        </p>
                    </Card>
                </Grid>
        
                {/* Product Details Section */}
                <Grid item xs={12} md={6}>
                    <Box className="product-details" sx={{ p: 2 }}>

                        <h1 className='cart-head'>
                            Reviews & Ratings
                        </h1>
                        <p className='cart-paragraph'>
                            Lorem ipsum dolor sit amet, qui autem dignissimos sed aliquid corporis est voluptatem nemo cum omnis porro aut consequatur magni et galisum quos.
                        </p>

                        <Link href="#" underline="none" sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 3 }}>
                            <Button variant="outlined" endIcon={<ReadMoreOutlinedIcon />}
                                sx={{
                                    borderColor: '#151515',
                                    color: '#151515',
                                    '&:hover': {
                                        borderColor: '#6B4028',
                                        backgroundColor: 'transparent',
                                    },
                                }}>
                                Read More
                            </Button>
                        </Link>

                        <h1 className='cart-price'>
                            RS.329
                        </h1>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Typography variant="body1" sx={{ mr: 2 }}>
                                Quantity
                            </Typography>
                            <IconButton color="#151515"
                                sx={{
                                    border: '1px solid',
                                    borderColor: '#151515',
                                    borderRadius: '50%',
                                    padding: '5px'
                                }}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1"
                                sx={{
                                    mx: 2,
                                    border: '1px solid',
                                    borderColor: '#151515',
                                    borderRadius: '20%',
                                    padding: '5px 10px'
                                }}>
                                2
                            </Typography>
                            <IconButton color="#151515"
                                sx={{
                                    border: '1px solid',
                                    borderColor: '#151515',
                                    borderRadius: '50%',
                                    padding: '5px'
                                }}>
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Button variant="contained" color="primary"
                            sx={{
                                mb: 3,
                                backgroundColor: '#6B4028',
                                color: 'white',
                                p: '10px 20px',
                                borderRadius: '10px',
                                fontFamily: 'pureblissPoppinsLight',
                                '&:hover': {
                                    backgroundColor: '#543310',
                                }
                            }}>
                            BUY NOW
                        </Button>
                    </Box>
                </Grid>

                <Container className='cartPageSlider'>
                    <CartSlider />
                </Container>

            </Grid>
        </Container>
    );
}

export default CartPage;
