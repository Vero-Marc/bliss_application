import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Grid, Paper, Typography, Button, IconButton, TextField, Box, TableContainer,
  Table, TableBody, TableCell, TableRow,
  Link,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../services/AuthContext';
import './cart.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoadingOverlay from '../../components/LoadingOverlay';

const CartItem = ({ item, onRemove, onQuantityChange ,index}) => {
  return (
    // <Paper sx={{ padding: 2, marginBottom: 2, backgroundColor: '#49444b' }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12} sm={4} md={3}>
          <img loading="lazy" src={item.imageUrl} alt={item.product_name} style={{ width: '100%', height: 'auto' }} className='cart-image'/>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ color: '#fff' }}>{item.product_name}</Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Typography variant="h6" sx={{ color: '#fff' }}>₹ {item.selling_price === 0 ?  item.original_price:item.selling_price}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => onQuantityChange(item.cart_id? item.cart_id : index, 'product_qty', item.product_qty - 1)} disabled={item.product_qty <= 1}>
              <Remove sx={{ color: '#fff' }} />
            </IconButton>
            <TextField
              value={item.product_qty}
              onChange={(e) => onQuantityChange(item.cart_id? item.cart_id : index, 'product_qty', parseInt(e.target.value))}
              type="number"
              variant="outlined"
              size="small"
              sx={{ width:'50%', textAlign: 'center', backgroundColor: 'white' }}
            />
            <IconButton onClick={() => onQuantityChange(item.cart_id? item.cart_id : index, 'product_qty', item.product_qty + 1)}>
              <Add sx={{ color: '#fff' }} />
            </IconButton>
            <IconButton aria-label="delete">
           <DeleteIcon onClick={() => onRemove(item.cart_id? item.cart_id : index)} sx={{color:'maroon'}}/>
            </IconButton>
           
          </Box>
        </Grid>
        <hr
        style={{
        border: '0',
        borderTop: 'solid #bed4c2',
        width:'100% ',// Adjust thickness and color
        // marginBottom:'20px'
        margin: '20px 10px 20px 10px' // Spacing around the line
      }}
    />
      </Grid>
    // </Paper>
  );
};

const CartField = ({ cartData, onRemove, onQuantityChange ,user}) => (
  <>
    {cartData && Array.isArray(cartData) && cartData.length !== 0
      ? cartData.map((item,index) => (
        <CartItem key={index} item={item} onRemove={onRemove} onQuantityChange={onQuantityChange} index={index}/>
      ))
      : <Typography variant="body1" sx={{color:'#fff',textAlign:'center'}}>{ user === null ? "Please login to view you cart" : "No products in the cart"}  </Typography>
    }
  </>
);

const Cart = () => {
  const { user, getData, update, Delete, DeleteAll , ImageFetch} = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState( []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      async function fetchCartItems() {
      setLoading(true)
      try {
        // const response = user !== null ? await getData('list_cart') : JSON.parse(localStorage.getItem('guestusercart')) ? JSON.parse(localStorage.getItem('guestusercart')) : []
        let response;

            if (user !== null) {
                let cartresponse = await getData('list_cart')
                response = cartresponse && cartresponse.data 
            } else {
                const guestCart = localStorage.getItem('guestusercart');
                response = guestCart ? JSON.parse(guestCart) : [];
            }

        if (response && Array.isArray(response) ) {
            const updatedProducts = await Promise.all(response.map(async (product) => {

            const productImage = Array.isArray(product.product_image)
                  ? product.product_image
                  : JSON.parse(product.product_image);
                const img_path = productImage[0];
            const imgresponse = await ImageFetch({ "file_path": img_path }, 'get_file');
            const imageUrl = URL.createObjectURL(imgresponse);
             
            return {
              ...product,
              imageUrl // Add the object URL to the product
            }
          }));
          
          setCartItems(updatedProducts);

        } else {
          console.warn('Response data is not an array:', response);
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false)
    }

    fetchCartItems();
    return () => {
      // setCartItems((data)=>{ return data})
      // cartItems.forEach((product) => {
      //   if (product.imageUrl) {
      //     URL.revokeObjectURL(product.imageUrl);
      //   }
      // });
    };
  }, [user, getData, ImageFetch]);

  const handleRemove = async (id) => {
    setCartItems(cartItems.filter((item) => item.cart_id !== id));
    if(user !== null){
      await Delete({ cart_id: id }, 'delete_cart');
      const count =  localStorage.getItem('cartList') -1 
      localStorage.setItem('cartList',count)
    } else {
      const updData = cartItems.filter((item,index) => index !== id)
      localStorage.setItem('guestusercart', JSON.stringify(updData));
      setCartItems(cartItems.filter((item,index) => index !== id));
      const count = localStorage.getItem('cartList') -1
      localStorage.setItem('cartList',count)
    }
  };

  const handleQuantityChange = async (id, field, value) => {
    
    if(user !== null){
      const input = { cart_id: id, product_qty: value };
      await update(input, 'update_cart');
     setCartItems(cartItems.map((item) => item.cart_id === id ? { ...item, [field]: value } : item));

    } else {
           const updData = cartItems.map((item,index) =>
            index === id ? { ...item, [field]: value } : item
            );
          localStorage.setItem('guestusercart', JSON.stringify(updData));
          
          setCartItems(cartItems.map((item,index) => index === id ? { ...item, [field]: value } : item));
    }
  };

  const handleClearCart = async () => {
    setCartItems([]);
    if(user !== null){
      await DeleteAll('delete_all_cart');
      localStorage.removeItem('cartList')
    } else {
      localStorage.removeItem('guestusercart');
      localStorage.removeItem('cartList',0)
    }
  };

  const onProceed = () =>{
    if(user !== null) {
      navigate('/checkout')
    } else {
      localStorage.setItem('redirectAfterLogin', '/checkout');
      navigate('/login')
    }
  }
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.selling_price === 0 ?  item.original_price: item.selling_price) * item.product_qty, 0);

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, backgroundColor: '#ECE6D8'  }} >
     <Container maxWidth="lg">
     {loading && <LoadingOverlay />}

     { (cartItems && cartItems.length) !== 0 && 
        <Box sx={{ padding: '10px', textAlign: 'start' }}>
          <Typography variant="h4" sx={{ color: 'brown' }}>Your Cart</Typography>
          <Typography variant="body1">{cartItems.length} items in your bag</Typography>
          
         <Box sx={{paddingTop:'20px'}}><Button
          variant="contained"
          sx={{
            mb: 3,
            backgroundColor: '#bed4c2',
            color: 'black',
            display: 'block',
            borderRadius: '20px',
            fontFamily: 'pureblissPoppinsLight',
            '&:hover': { backgroundColor: '#543310' },
          }}
          onClick={handleClearCart}
         >
          Clear Cart
         </Button></Box>
        </Box>}
        {cartItems.length === 0 ?
        
       ( <>
        <Typography variant="h4" sx={{ color: 'brown' }}>Your Cart</Typography>
         <Box sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         paddingTop:'60px',
        }}>
         <Typography sx={{fontSize:'2px solid bold'}}>No Items in the cart to view</Typography>
         </Box>
       <Box  sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         height: '40vh', // Full viewport height
        }}>
        
       <IconButton aria-label="cart" sx={{fontSize: 'inherit'}}>
        <ShoppingCartIcon sx={{ fontSize: 100 }}/>
      </IconButton> 
      </Box> </>) 
        : 
        (<Grid container spacing={14}>
          <Grid item xs={12} md={8} >
            <TableContainer component={Paper} sx={{ backgroundColor: '#49444b', width:'90%', borderRadius: '10px', padding: '20px' }}>
              <CartField cartData={cartItems} onRemove={handleRemove} onQuantityChange={handleQuantityChange} user={user}/>
            </TableContainer>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ backgroundColor: '#49444b', padding: '10px 20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography id="cal" sx={{ color: '#bed4c2' }}>Calculate Shipping</Typography>
              {/* <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Country</InputLabel>
                <Select
                  sx={{ width: '100%', height: '40px', borderRadius: '20px', backgroundColor: 'white' }}
                  value={"India"}
                  label="Country"
                >
                  <MenuItem value="India">India</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField
                  placeholder="State/City"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '20px', height: '40px', backgroundColor: 'white' } }}
                />
                <TextField
                  placeholder="Zip Code"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '20px', height: '40px', backgroundColor: 'white' } }}
                />
              </Box>
              <Button variant="contained"  disabled = {user === null ? true : false} sx={{ borderRadius: '20px', backgroundColor: '#bed4c2', width: '100%', color: 'black', fontFamily: '"pureblissPoppinsLight", serif', '&:hover': { backgroundColor: '#7B967A', color: '#fff', fontWeight: 'normal' } }}>
                Update
              </Button> */}
              <Typography id="Total" sx={{ mt: 2, color: '#fff' }}>Cart Total</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: '#fff' }}>Cart Subtotal</TableCell>
                    <TableCell sx={{ color: '#fff' }}>₹ {subtotal.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#fff' }}>Discount</TableCell>
                    <TableCell sx={{ color: '#fff' }}>-</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell sx={{ color: '#fff' }}>Courier Charges</TableCell>
                    <TableCell sx={{ color: '#fff' }}>₹70.00</TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell sx={{ color: '#fff' }}>Cart Total</TableCell>
                    <TableCell sx={{ color: '#fff' }}>₹ {subtotal.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button
                variant="contained"
                sx={{ borderRadius: '20px', backgroundColor: '#bed4c2', width: '100%', mt: 2, color: 'black', fontFamily: '"pureblissPoppinsLight", serif', '&:hover': { backgroundColor: '#7B967A', color: '#fff', fontWeight: 'normal' } }}
                onClick={() => onProceed() }
              >
                Proceed
              </Button>
            </Box>
          </Grid>
        </Grid>)}
        <Box sx={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4">
          <Link href="/terms" variant="body2" color="#74512D" underline="none">
          Terms and Conditions Apply
            </Link>
            </Typography>
        
        </Box>
    </Container>  
    </Box>
  );
};

export default Cart;
