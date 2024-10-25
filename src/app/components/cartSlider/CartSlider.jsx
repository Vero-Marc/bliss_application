import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../cartSlider/cartSlider.css'; // Ensure this matches the actual file name
import { Button, Tooltip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AuthContext from '../../services/AuthContext'

import { Navigation, Pagination } from 'swiper/modules'; // Correct import path for modules
import { useNavigate } from 'react-router-dom';

const CartSlider = ({productsList,setpopUpOpen,setLoading}) => {
    const [sliderPros,setSliderPros] = useState(productsList)
    const { insert,ImageFetch,user } = useContext(AuthContext)
    const [tempCartItem,settempCartItem] = useState(() => JSON.parse(localStorage.getItem('guestusercart')) || [])
    const navigate= useNavigate()
    useEffect(() => {
        async function fetchProducts() {
          try {
      
            if (productsList && Array.isArray(productsList) ) {
                 const updatedProducts = await Promise.all(productsList.map(async (product) => {
                // Fetch blob for the image
                const img_path = product.product_image[0]
                const imgresponse = await ImageFetch({ "file_path": img_path }, 'get_file');
                const imageUrl = URL.createObjectURL(imgresponse);
                 
                return {
                  ...product,
                  imageUrl // Add the object URL to the product
                };
              }));
              
              setSliderPros(updatedProducts);
      
            } else {
              console.warn('Response data is not an array:');
            }
          } catch (error) {
            console.error('Error fetching products:', error);
          }
          setLoading(false)
        }
      
        fetchProducts();
        return () => {
          setSliderPros((data)=> data)
          // sliderPros.forEach((product) => {
          //   if (product.imageUrl) {
          //     URL.revokeObjectURL(product.imageUrl);
          //   }
          // });
        };
      }, [ImageFetch, productsList, setLoading]);
     
      const AddToCart = useCallback(async(product) => {
        if (user !== null) {
        const input = {
          product_id: product.id,
          product_qty : 1,
          // customer_id : user.uid,
          // created_by : userLoginData
          }
        const res = await insert(input,'add_to_cart');
        // const data = await res.json()
        if (res.ok) {
            setpopUpOpen(true);
        }
      const count = localStorage.getItem('cartList') ? localStorage.getItem('cartList') + 1 : 1
      localStorage.setItem('cartList',count)
        } else {
          const input =[{
            product_id :product.id,
            product_qty : 1,
            product_name : product.product_name,
            product_image:product.product_image,
            original_price:product.original_price,
            selling_price:product.selling_price,
            description:product.description,
        }]
        const cartItems = [...tempCartItem ,...input]
        settempCartItem(cartItems)
        localStorage.setItem('guestusercart',JSON.stringify(cartItems));
        localStorage.setItem('cartList',cartItems.length)
        setpopUpOpen(true);
        }
      },[insert, setpopUpOpen, tempCartItem, user])
     

    return (
        <div className="shop-container">
            <h2 className="cart-title">Other Related Products</h2>
            <div className="swiper-container">
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={4}
                    spaceBetween={25}
                    loop={true}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        520: {
                            slidesPerView: 2,
                        },
                        950: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 4,
                        },
                    }}
                >

                    {sliderPros?.map((product, index) => (
                        <SwiperSlide key={index}>
                            <div className="card">
                                <img loading="lazy" src={product.imageUrl} alt={`Product ${index + 1}`} className="card-image" onClick={()=> navigate(`/productview/${product.id}`)}/>
                                <Tooltip title={product.product_name} >
                                  <p className="card-description">{product.product_name}</p>
                                   </Tooltip>
                                <p className="card-price">{`Rs.${product.selling_price === 0 ?  product.original_price:product.selling_price}`}</p>
                                <Button variant="contained"
                                    sx={{
                                        backgroundColor: '#7B967A',
                                        color: '#fff',
                                        padding: '5px 20px',
                                        borderRadius: '0px',
                                        '&:hover': {
                                            backgroundColor: '#88A087',
                                        },
                                        fontFamily: 'pureblissPoppinsLight',
                                        fontSize: '16px',
                                    }}
                                    onClick={()=> AddToCart(product)}
                                    className="card-button">ADD TO CART</Button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* <div className="swiper-button-next swiper-navBtn"></div>
                <div className="swiper-button-prev swiper-navBtn"></div> */}
                <ArrowForwardIcon  className='swiper-navBtn swiper-button-next' sx={{border:'3px solid black' ,color:'black'}}/>
                <ArrowBackIcon className="swiper-button-prev swiper-navBtn" sx={{border:'3px solid black' ,color:'black'}}/>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    );
};

export default CartSlider;
