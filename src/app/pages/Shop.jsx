// Excellent code structure start

import React, { useContext, useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import "./shop.css";
import CardSlider from "../components/productSlider/CardSliderList";
import ProductPage from "../features/products/ProductPage";
import AuthContext from "../services/AuthContext";
import { useSelector } from "react-redux";
import Popup from "../components/Popup";
import LoadingOverlay from "../components/LoadingOverlay";
import Shop_1 from "../../assets/images/Shop-1.png";

const Shop = () => {
  const { insert, getProductsData, ImageFetch } = useContext(AuthContext);
  const productsSelector = useSelector((state) => state.products.items.data);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempCartItem, settempCartItem] = useState(
    () => JSON.parse(localStorage.getItem("guestusercart")) || []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let allProducts = [];
        // productsSelector && productsSelector?.length !==0 ? productsSelector : products
        if (productsSelector && productsSelector?.length !== 0) {
          allProducts = productsSelector;
        } else {
          const response = await getProductsData("list_product");
          if (response && Array.isArray(response.data)) {
            allProducts = response.data;
          }
        }

        if (
          allProducts &&
          Array.isArray(allProducts) &&
          allProducts.length > 0
        ) {
          const updatedProducts = await Promise.all(
            allProducts.map(async (product) => {
              // Fetch blob for the image
              const img_path = product.product_image[0];
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

          setProducts(updatedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    }
    fetchProducts();
    // return () => {
    //   setProducts((data=> {return [...data]} ))
    //   products.forEach((product) => {
    //     if (product.imageUrl) {
    //       URL.revokeObjectURL(product.imageUrl);
    //     }
    //   });
    // };
  }, [ImageFetch, getProductsData, productsSelector]);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div class="cart-section">
      <Container
        sx={{ position: "relative", textAlign: "center" }}
        class="shopContainer"
      >
        <Popup
          open={open}
          handleClose={handleClose}
          severity="success"
          message={"Product added to cart"}
        />
        {loading && <LoadingOverlay />}
        <Box className="shopSecImg">
          <img
            loading="lazy"
            src={Shop_1}
            alt="Shop"
            className="background-image"
          />
        </Box>
      </Container>

      <div className="prod-section">
        <Container>
          <CardSlider
            insertData={insert}
            handleClose={handleClose}
            setOpen={setOpen}
            settempCartItem={settempCartItem}
            tempCartItem={tempCartItem}
            productsList={
              productsSelector && productsSelector?.length !== 0
                ? productsSelector
                : products
            }
            setLoading={setLoading}
          />
        </Container>
        {((productsSelector && productsSelector.length !== 0) ||
          products.length !== 0) && <div className="prod-label"></div>}
      </div>

      <div className="shop-page">
        <ProductPage
          insertData={insert}
          handleClose={handleClose}
          setOpen={setOpen}
          settempCartItem={settempCartItem}
          tempCartItem={tempCartItem}
          productsList={products}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default Shop;
