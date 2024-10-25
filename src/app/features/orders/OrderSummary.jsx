import { Typography ,Box,Container,Paper, Button} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/system';
import AuthContext from '../../services/AuthContext';
import { useParams } from 'react-router-dom';
const OrderContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
  }));
const OrderSummary = () => {
const { Fetch } = useContext(AuthContext)
const { orderId } = useParams();
const [orderData,setOrderData] = useState({})

 useEffect(()=>{
    async function fetchProducts(){
        const response = await Fetch({order_id:orderId},'get_order');
        const orderData = response?.data ? response?.data : {}
        setOrderData(orderData ? orderData : {})
      }
      fetchProducts()
      return ()=>{
        setOrderData((data)=> {return data} )
      }
 },[Fetch, orderId])

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, backgroundColor: '#ECE6D8' }} >
    <Container maxWidth="md" >
      <OrderContainer sx={{backgroundColor: '#3f3b3f80',marginBottom:10}} >
        <Typography variant="h5" gutterBottom sx={{color:'#fff'}}>
          View Order Details
        </Typography>
        <Box sx={{border:'3px solid grey' , padding:'8px', borderRadius:'4px'}}>
        <Typography  gutterBottom sx={{color:'#fff'}}>{`Order Date   ${orderData.created_at}`}</Typography>
        <Typography  gutterBottom sx={{color:'#fff'}}>{`Order#        ${orderData.id}`}</Typography>
        <Typography  gutterBottom sx={{color:'#fff'}}>{`Total Price        ${orderData.total_price}`}</Typography>
        </Box>
        
        <Button> Cancel Order</Button>

        <Typography variant="h6" gutterBottom sx={{color:'#fff'}}>
          Shipment Details
        </Typography>
        <Box sx={{border:'3px solid grey' , padding:'8px', borderRadius:'4px'}}>
        <Typography  gutterBottom sx={{color:'#fff'}}>{`${orderData.customer_name}`}</Typography>
        <Typography  gutterBottom sx={{color:'#fff'}}>{`${orderData.address}`}</Typography>
        <Typography  gutterBottom sx={{color:'#fff'}}>{`${orderData.city} ${orderData.state} ${orderData.pincode}`}</Typography>
        <Typography  gutterBottom sx={{color:'#fff'}}>{`${orderData.country} `}</Typography>
        <Typography  gutterBottom sx={{color:'#fff'}}>{`${orderData.phone} `}</Typography>
        </Box>

        <Button> Track Shipment </Button>
        </OrderContainer>
        </Container>
        </Box>
  )
}

export default OrderSummary
