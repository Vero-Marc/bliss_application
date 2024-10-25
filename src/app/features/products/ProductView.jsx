import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import "./style/ProductView.css";
import "./../../pages/shop.css";
import CartSlider from "../../components/cartSlider/CartSlider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import '../productSlider/cardSlider.css'; // Ensure this matches the actual file name
import { useNavigate, useParams } from "react-router-dom";
import CarouselComponent from "./CarouselComponent";
import AuthContext from "../../services/AuthContext";
import { useSelector } from "react-redux";
import Popup from "../../components/Popup";
import LoadingOverlay from "../../components/LoadingOverlay";
// import ProductReviewsAndRatings from './ProductReview';

const ProductView = () => {
  const productsList = useSelector((state) => state.products.items.data);
  const { FetchProductsData, ImageFetch, user, getProductsData } =
    useContext(AuthContext);
  const { productId } = useParams();
  const [pageData, setPageData] = useState({});
  const [open, setOpen] = useState(false);
  const [popUpOpen, setpopUpOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState([])
  const navigate = useNavigate();
  const [slideProducts, setSlideProducts] = useState(productsList);
  const [loading, setLoading] = useState(false);

  // const mainImage = "../main-images/SambhraniDhoopCups.png";
  // const thumbnailImages = [
  //     { preview: "../main-images/AllProducts.png", alt: "Thumbnail 1" },
  //     { preview: "../main-images/AgarbathiInscence.png", alt: "Thumbnail 1" },
  //     { preview: "../main-images/SambhraniDhoopCups.png", alt: "Thumbnail 1" },
  // ];

  const handleImageClick = (image) => {
    // setSelectedImage(image);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await FetchProductsData(
          { product_id: productId },
          "get_product"
        );
        let productDataResponse = response?.data ? response?.data : {};
        let files = [];

        if (response && Array.isArray(productDataResponse.product_image)) {
          // Create an array of promises for fetching images
          const imagePromises = productDataResponse.product_image?.map(
            async (img_path) => {
              const imgresponse = await ImageFetch(
                { file_path: img_path },
                "get_file"
              );
              const imgurl = URL.createObjectURL(imgresponse);
              return {
                file: imgresponse,
                preview: imgurl,
              };
            }
          );

          files = await Promise.all(imagePromises);

          let DataResponse = {
            ...productDataResponse,
            product_image: files,
            buyingQuantity: 1,
          };

          setPageData(DataResponse);
        } else {
          setPageData(productDataResponse);
        }

        if (!productsList) {
          try {
            const response = await getProductsData("list_product");

            if (response && Array.isArray(response.data)) {
              setSlideProducts(response.data);
            } else {
              console.warn("Response data is not an array:", response.data);
              setSlideProducts([]);
            }
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        }
      } catch (error) {
        console.log("error fetching product", error);
        setPageData({});
      }
      // setLoading(false)
    }
    fetchData();
    return () => {
      setPageData((data) => {
        return data;
      });
      // Array.from(pageData.product_image).forEach((product) => {
      //     if (product.preview) {
      //       URL.revokeObjectURL(product.preview);
      //     }
      //   });
    };
  }, [FetchProductsData, ImageFetch, getProductsData, productId, productsList]);

  const handlePopupClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setpopUpOpen(false);
  };

  const handleOnclick = (PId) => {
    if (user !== null) {
      navigate(
        `/checkout?productid=${PId}&quantity=${pageData.buyingQuantity}`
      );
    } else {
      localStorage.setItem(
        "redirectAfterLogin",
        `/checkout?productid=${PId}&quantity=${pageData.buyingQuantity}`
      );
      navigate("/login");
    }
  };

  const handleQuantityChange = async (value) => {
    // const input = { cart_id: id, product_qty: value };
    // await update(input, 'update_cart');
    setPageData((data) => {
      return { ...data, buyingQuantity: value };
    });
    // setCartItems(cartItems.map((item) => item.cart_id === id ? { ...item, [field]: value } : item));
  };

  return (
    <Container className="cart-section" maxWidth="mx">
      <Grid container spacing={4}>
        <Popup
          open={popUpOpen}
          handleClose={handlePopupClose}
          severity="success"
          message={"Product added to cart"}
        />
        {loading && <LoadingOverlay />}
        <Grid item xs={12} md={4}>
          <Card
            className="product-image-card"
            sx={{ p: 2, background: "none", boxShadow: "none" }}
          >
            <h1 className="cart-head">{pageData.product_name}</h1>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Box className="main-image">
                <img
                  loading="lazy"
                  src={pageData.product_image?.[0]?.preview}
                  alt="Product"
                  className="main-img"
                  onClick={() => handleImageClick()}
                />
              </Box>

              <Box
                className="thumbnail-images"
                sx={{ display: "flex", flexDirection: "column", gap: 2, ml: 2 }}
              >
                {pageData?.product_image?.map((image, index) => (
                  <img
                    loading="lazy"
                    key={index}
                    src={image.preview}
                    alt={`upload-${index}`}
                    className="thumbnail-img"
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </Box>
            </Box>

            {/* <h1 className='cart-head'>
                            Description
                        </h1>
                        <p className='cart-paragraph'>
                        {pageData.description}
                        </p> */}
          </Card>
        </Grid>
        <CarouselComponent
          // selectedImage={selectedImage}
          images={pageData?.product_image ? pageData?.product_image : []}
          open={open}
          onClose={handleClose}
        />

        {/* Product Details Section */}
        <Grid item xs={12} md={8}>
          <Box className="product-details" sx={{ p: 2 }}>
            {/* <h1 className='cart-head'>
                            Reviews & Ratings
                        </h1>
                        <p className='cart-paragraph'>
                            <ProductReviewsAndRatings/>
                        </p> */}

            <h1 className="cart-head">Description</h1>
            <p className="cart-paragraph">{pageData.description}</p>

            {/* <Link href="#" underline="none" sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 3 }}>
                            <Button variant="outlined" endIcon={<ReadMoreOutlinedIcon />}
                                sx={{
                                    borderRadius:'20px',
                                    borderColor: '#151515',
                                    color: '#151515',
                                    '&:hover': {
                                        borderColor: '#6B4028',
                                        backgroundColor: 'transparent',
                                    },
                                }}>
                                Read More
                            </Button>
                        </Link> */}

            <h1 className="cart-price">
              {`Rs.${
                pageData.selling_price === 0
                  ? pageData.original_price
                  : pageData.selling_price
              }`}
            </h1>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Quantity
              </Typography>
              <IconButton
                onClick={() =>
                  handleQuantityChange(pageData.buyingQuantity - 1)
                }
                color="#151515"
                // sx={{
                //   // width:'10px',
                //   // height:'10px',
                //   border: "1px solid",
                //   borderColor: "#151515",
                //   borderRadius: "50%",
                //   padding: "2px",
                // }}
                sx={{
                    width: '24px',  // Adjust to desired width
                    height: '24px', // Adjust to desired height
                    padding: '2px', // Smaller padding for a smaller button
                    border: '1px solid',
                    borderColor: '#151515',
                    borderRadius: '50%',
                  }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body1"
                sx={{
                  mx: 2,
                  width: "40px",
                  border: "1px solid",
                  borderColor: "#151515",
                  borderRadius: "20%",
                  padding: "5px 10px",
                }}
              >
                {pageData.buyingQuantity}
              </Typography>
              <IconButton
                color="#151515"
                onClick={() =>
                  handleQuantityChange(pageData.buyingQuantity + 1)
                }
                // sx={{
                //   border: "1px solid",
                //   borderColor: "#151515",
                //   borderRadius: "50%",
                //   padding: "5px",
                // }}
                sx={{
                    width: '24px',  // Adjust to desired width
                    height: '24px', // Adjust to desired height
                    padding: '2px', // Smaller padding for a smaller button
                    border: '1px solid',
                    borderColor: '#151515',
                    borderRadius: '50%',
                  }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              onClick={() => handleOnclick(productId)}
              className="buy-button"
              sx={{
                mb: 3,
                backgroundColor: "#7B967A",
                color: "white",
                p: "10px 20px",
                borderRadius: "30px",
                width: {
                  xs: "80%", // 100% width on extra small screens
                  sm: "60%", // 60% width on small screens
                  md: "40%", // 40% width on medium screens
                  lg: "30%", // 30% width on large screens
                },
                fontFamily: "pureblissPoppinsLight",
                "&:hover": {
                  backgroundColor: "#543310",
                },
              }}
            >
              BUY NOW
            </Button>
          </Box>
        </Grid>

        <Container className="cartPageSlider">
          <CartSlider
            productsList={slideProducts}
            setpopUpOpen={setpopUpOpen}
            setLoading={setLoading}
          />
        </Container>
      </Grid>
    </Container>
  );
};

export default ProductView;
