import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Grid,
  Container,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../services/AuthContext";
import Popup from "../../components/Popup";
import LoadingOverlay from "../../components/LoadingOverlay";

const PlaceOrder = () => {
  const { Fetch, insert, getData, ImageFetch, user, Delete } =
    useContext(AuthContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productid = query.get("productid");
  const productquantity = query.get("quantity");
  const cartId = query.get("cartId");
  const [checkoutCart, setCheckoutCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [cartData, setCartData] = useState({});
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    payment_mode: "onlinepayment",
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [countriesRef, setCountries] = useState([]);

  const countriesfetch = useCallback(async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const countryData = data.map((country) => ({
        code: country.cca2,
        value: country.name.common,
        name: country.name.common,
      }));

      setCountries(countryData);
      // Trigger a re-render by updating a dummy state
      // setCountriesUpdated(prev => !prev);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  }, []);

  useEffect(() => {
    const guestCart = localStorage.getItem("guestusercart");
    if (guestCart !== null) {
      const response = guestCart ? JSON.parse(guestCart) : [];
      async function addingGuestcart(input) {
        await insert(input, "add_to_cart");
      }
      response.map((product) => {
        const input = {
          product_id: product.product_id,
          product_qty: product.product_qty,
        };
        return addingGuestcart(input);
      });
      localStorage.removeItem("guestusercart");
      // localStorage.removeItem('cartList',0)
    }
    countriesfetch();
    async function fetchData() {
      setLoading(true);
      const response = await getData("get_customer");
      const userData = response?.data ? response?.data : {};
      setBillingDetails({
        name: userData.customer_name,
        email: userData.email,
        phone: userData.mobile_number,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        pincode: userData.pincode,
        country: userData.country,
        payment_mode: "onlinepayment",
      });
      if (cartId !== null) {
        const response = await Fetch({ cart_id: cartId }, "get_cart");
        const cartdata = response?.data ? response?.data[0] : {};
        setCartData(cartdata || {});
      } else if (productid !== null) {
        try {
          const response = await Fetch(
            { product_id: productid },
            "get_product"
          );
          const productData = response?.data ? response?.data : {};
          setCartData(productData || {});

          if (response && Array.isArray(response.data.product_image)) {
            // Fetch blob for the image
            const img_path = response.data.product_image[0];
            const imgresponse = await ImageFetch(
              { file_path: img_path },
              "get_file"
            );
            const imageUrl = URL.createObjectURL(imgresponse);

            const updatedProducts = {
              ...response.data,
              product_qty: productquantity,

              imageUrl, // Add the object URL to the product
            };

            setCheckoutCart([updatedProducts]);
          } else {
            console.warn("Response data is not an array:", response.data);
            setCheckoutCart([]);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        try {
          const response = await getData("list_cart");

          if (response && Array.isArray(response.data)) {
            localStorage.setItem("cartList", response.data.length);
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

            setCheckoutCart(updatedProducts);
          } else {
            console.warn("Response data is not an array:", response.data);
            setCheckoutCart([]);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
      setLoading(false);
    }

    fetchData();
    return () => {
      // checkoutCart.forEach((product) => {
      //   if (product.imageUrl) {
      //     URL.revokeObjectURL(product.imageUrl);
      //   }
      // });
    };
  }, [
    Fetch,
    ImageFetch,
    cartId,
    countriesfetch,
    getData,
    insert,
    productid,
    productquantity,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const shippingCharge = useMemo(() => 10, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // window.location.href = 'https://razorpay.me/@Thepurebliss';
      if (productid !== null) {
        const input = {
          customer_name: billingDetails.name,
          product_id: productid,
          quantity: productquantity,
          email: billingDetails.email,
          phone: billingDetails.phone,
          address: billingDetails.address,
          city: billingDetails.city,
          state: billingDetails.state,
          country: billingDetails.country,
          pincode: billingDetails.pincode,
          total_price:
            cartData.selling_price === 0
              ? cartData.original_price
              : cartData.selling_price + shippingCharge,
          payment_mode: billingDetails.payment_mode,
        };
        const response = await insert(input, "create_order");
        if (response.ok) {
          setOpen(true);
        }
      } else {
        const checkoutProducts = await Promise.all(
          checkoutCart.map(async (product) => {
            // Fetch blob for the image
            const input = {
              customer_name: billingDetails.name,
              product_id: product.product_id,
              quantity: product.product_qty,
              email: billingDetails.email,
              phone: billingDetails.phone,
              address: billingDetails.address,
              city: billingDetails.city,
              state: billingDetails.state,
              country: billingDetails.country,
              pincode: billingDetails.pincode,
              total_price:
                product.selling_price === 0
                  ? product.original_price
                  : product.selling_price + shippingCharge,
              payment_mode: billingDetails.payment_mode,
            };

            const response = await insert(input, "create_order");
            // const cartData1 = response?.data ? response?.data[0] : {};
            return response;
          })
        );

        if (checkoutProducts[0].ok) {
          setOpen(true);
          await Promise.all(
            checkoutCart.map(async (cart) => {
              const response = await Delete(
                { cart_id: cart.cart_id },
                "delete_cart"
              );
              return response;
            })
          );
          localStorage.removeItem("cartList");
          navigate("/");
        }
      }
    },
    [
      productid,
      billingDetails.name,
      billingDetails.email,
      billingDetails.phone,
      billingDetails.address,
      billingDetails.city,
      billingDetails.state,
      billingDetails.country,
      billingDetails.pincode,
      billingDetails.payment_mode,
      productquantity,
      cartData.selling_price,
      cartData.original_price,
      shippingCharge,
      insert,
      checkoutCart,
      navigate,
      Delete,
    ]
  );

  const subtotal = checkoutCart.reduce(
    (acc, item) =>
      acc +
      (item.selling_price === 0 ? item.original_price : item.selling_price) *
        item.product_qty,
    0
  );
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const countryOptions = useMemo(() => {
    return countriesRef.map((country) => (
      <MenuItem key={country.code} value={country.value}>
        {country.name}
      </MenuItem>
    ));
  }, [countriesRef]);

  const customTextField = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      height: "40px",
      backgroundColor: "white",
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
      "& input": {
        height: "100%",
        padding: "0 14px",
      },
      "& .MuiInputBase-input": {
        padding: "0 14px",
      },
    },
    "& input::placeholder": {
      color: "black",
    },
    "& input:-webkit-autofill": {
      backgroundColor: "white !important",
      color: "black !important",
    },
    "& input:-webkit-autofill::placeholder": {
      color: "black !important",
      backgroundColor: "white !important",
    },
    "& input:-moz-autofill": {
      backgroundColor: "white !important",
      color: "black !important",
    },
    "& input:-moz-autofill::placeholder": {
      color: "black !important",
      backgroundColor: "white !important",
    },
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: "#ECE6D8" }}>
      <Popup
        open={open}
        handleClose={handleClose}
        severity="success"
        message={"Order placed Successfully"}
      />
      {loading && <LoadingOverlay />}
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          {/* Checkout Form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                padding: 3,
                backgroundColor: "#49444b",
                borderRadius: 2,
                marginBottom: 10,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{ color: "#bed4c2", marginBottom: 2 }}
                >
                  Where should your order be sent?
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    placeholder="Full Name (First & Last name)"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={billingDetails.name}
                    onChange={handleInputChange}
                    margin="normal"
                    sx={customTextField}
                  />
                  <TextField
                    placeholder="Mobile Number"
                    name="phone"
                    // variant="outlined"
                    fullWidth
                    value={billingDetails.phone}
                    onChange={handleInputChange}
                    margin="normal"
                    sx={customTextField}
                  />
                  <TextField
                    placeholder="Address Line 1"
                    name="address"
                    // variant="outlined"
                    fullWidth
                    value={billingDetails.address}
                    onChange={handleInputChange}
                    margin="normal"
                    sx={customTextField}
                  />
                  <Box sx={{ display: {md: "flex"}, gap:{md: "10px"}, mb: 2 }}>
                    <TextField
                      placeholder="City"
                      name="city"
                      variant="outlined"
                      fullWidth
                      value={billingDetails.city}
                      onChange={handleInputChange}
                      margin="normal"
                      sx={customTextField}
                    />
                    <TextField
                      placeholder="State"
                      name="state"
                      variant="outlined"
                      fullWidth
                      value={billingDetails.state}
                      onChange={handleInputChange}
                      margin="normal"
                      sx={customTextField}
                    />
                  </Box>
                  <Box>
                    <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                      <InputLabel>Country</InputLabel>
                      <Select
                        name="country"
                        value={billingDetails.country}
                        onChange={handleInputChange}
                        sx={{
                          width: {md:"50%"},
                          height: "40px",
                          borderRadius: "20px",
                          backgroundColor: "white",
                        }}
                        label="Country"
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200, // Adjust the height as needed
                              overflowY: "auto",
                            },
                          },
                        }}
                      >
                        {countryOptions}
                      </Select>
                    </FormControl>
                    <TextField
                      placeholder="Zip Code"
                      name="pincode"
                      // variant="outlined"
                      // width="50%"
                      value={billingDetails.pincode}
                      onChange={handleInputChange}
                      margin="normal"
                      sx={{ ...customTextField, width:{md: "50%"} }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 3,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        borderRadius: "20px",
                        backgroundColor: "#bed4c2",
                        color: "black",
                        fontFamily: '"pureblissPoppinsLight", serif',
                        "&:hover": {
                          backgroundColor: "#7B967A",
                          color: "#fff",
                          fontWeight: "normal",
                        },
                      }}
                    >
                      Continue to Payment
                    </Button>
                    {/* <a href="https://razorpay.me/@Thepurebliss" className="redirect-button" target="_blank" rel="noreferrer">
                      Visit Razorpay
                    </a> */}
                  </Box>
                </form>
              </Box>
            </Paper>
          </Grid>

          {/* Cart Summary */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 3, backgroundColor: "#49444b", borderRadius: 2 }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "#bed4c2" }}>
                Calculated Shipping
              </Typography>
              <Box
                sx={{
                  marginBottom: 2,
                  backgroundColor: "white",
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                {checkoutCart &&
                Array.isArray(checkoutCart) &&
                checkoutCart.length !== 0 ? (
                  checkoutCart.map((item) => (
                    <Box
                      sx={{ display: "flex", gap: 2, marginBottom: 2 }}
                      key={item.product_id}
                    >
                      <img
                        loading="lazy"
                        src={item.imageUrl}
                        alt={item.product_name}
                        style={{ width: "60px", borderRadius: "4px" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ marginTop: "15px", color: "#6b4028" }}
                      >
                        {item.product_name}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                  >
                    {user === null
                      ? "Please login to view your cart"
                      : "No products in the cart"}
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Subtotal: ₹ {parseInt(subtotal.toFixed(2)) || "0.00"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Discount: ₹ 0.00
              </Typography>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Courier Charges: ₹ {shippingCharge || "0.00"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Total: ₹{" "}
                {parseInt(subtotal.toFixed(2)) + shippingCharge || "0.00"}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PlaceOrder;