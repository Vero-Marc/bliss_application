import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import AuthContext from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";

const OrderContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const { getData, ImageFetch } = useContext(AuthContext);
  const [address, setaddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await getData("list_order_by_userfilter");

        if (response && Array.isArray(response.data)) {
          setOrders(response.data);
          const updatedProducts = await Promise.all(
            response.data.map(async (product) => {
              // Fetch blob for the image
              const productImage = Array.isArray(product.product_image)
                ? product.product_image
                : JSON.parse(product.product_image);
              const img_path = productImage[0];
              const imgresponse = await ImageFetch(
                { file_path: img_path },
                "get_file"
              );
              const imageUrl = URL.createObjectURL(imgresponse);

              return {
                ...product,
                imageUrl, // Add the object URL to the product
              };
            })
          );

          setOrders(updatedProducts);
          setaddress(updatedProducts[0].address);
        } else {
          console.warn("Response data is not an array:", response.data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, [ImageFetch, getData]);

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, backgroundColor: "#ECE6D8" }}>
      <Container maxWidth="md">
        <OrderContainer sx={{ backgroundColor: "#3f3b3f80", marginBottom: 10 }}>
          <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
            Order Details
          </Typography>
          {/* <Typography variant="subtitle1" sx={{color:'#fff'}}>Order ID: </Typography>
        <Typography variant="subtitle1" sx={{color:'#fff'}}>Order Date: </Typography>
        <Typography variant="subtitle1" sx={{color:'#fff'}}>Status: </Typography>
        <Typography variant="subtitle1" sx={{color:'#fff'}}>Total: </Typography> */}

          <Divider sx={{ marginY: 2 }} />
          <Box
            sx={{
              marginBottom: 2,
              backgroundColor: "white",
              borderRadius: 2,
              padding: 2,
            }}
           >
            {orders && Array.isArray(orders) && orders.length !== 0 ? (
              orders.map((item) => (
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={12} sm={4} md={3}>
                    <img
                      loading="lazy"
                      src={item.imageUrl}
                      alt={item.product_name}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <Typography variant="h6">{item.product_name}</Typography>
                  </Grid>
                  {/* <Grid item xs={6} sm={2} md={2}>
                          <Typography variant="h6" >₹ {item.total_price}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={2} md={2}>
                          <Typography variant="h6" > {item.quantity}</Typography>
                        </Grid> */}
                  <Grid item xs={6} sm={2} md={3}>
                    <Typography variant="h6"> {item.status}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} md={2}>
                    <Button
                      onClick={() => {
                        navigate(`/ordersummary/${item.order_id}`);
                      }}
                    >
                      {" "}
                      View Order Details
                    </Button>
                  </Grid>
                  <hr
                    style={{
                      border: "0",
                      borderTop: "solid #bed4c2",
                      width: "100% ", // Adjust thickness and color
                      marginBottom: "20px",
                      // margin: '30px 30px 30px 40px' // Spacing around the line
                    }}
                  />
                </Grid>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{ color: "black", textAlign: "center" }}
              >
                {"No orders to display"}{" "}
              </Typography>
            )}
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
            Shipping Address
          </Typography>
          <Typography variant="body1" sx={{ color: "#fff" }}>
            {address}
          </Typography>
        </OrderContainer>
      </Container>
    </Box>
  );
};

export default OrderDetails;
