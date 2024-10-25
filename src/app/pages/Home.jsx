// src/pages/Home.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { Box, Typography, Button } from "@mui/material";
// import '../fonts.css';
import "./style/Home.css";

import BLISSlogopng from "../../assets/images/SambhraniDhoopCups.png";
import Divinebathi from "../../assets/images/Divinebathi.png";
import AgarbathiInscence from "../../assets/images/AgarbathiInscence.png";
import HomePage from "../../assets/images/HomePage.png";
import HomePage_2 from "../../assets/images/HomePage-2.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);

  const navigate = useNavigate();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const Images = [
    { src: BLISSlogopng, alt: "Image 1" },
    { src: Divinebathi, alt: "Image 2" },
    { src: AgarbathiInscence, alt: "Image 3" },
  ];

  const pageNavigate = (path) => {
    if (path === "collection") {
      navigate("/collection");
    } else {
      navigate("/shop");
    }
  };

  return (
    <>
      {/* <Box className="home-container"> */}
        <Box className="home-container" sx={{overflowY:'hidden'}}>
        <Box className="home-content">
          {/* <ImageSlider images={images} /> */}
          <img
            loading="lazy"
            src={HomePage}
            alt="Background"
            className="second-image"
          />

          <Box
            className="text-overlay"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h2" class="bliss" component="div">
              PURE <br /> BLISS
            </Typography>
            <Typography
              variant="subtitle1"
              class="home-subtitle"
              component="div"
            >
              INCENSE FRAGRANCE
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="second-section">
        <img
          loading="lazy"
          src={HomePage_2}
          alt="Background"
          className="second-image"
        />
      </Box>
      <Box className="third-section homediv" sx={{ marginTop: 0 }}>
        <div className="home-Content">
          <div className="home-section">
            <Typography
              className="home-head"
              sx={{
                fontFamily: "purebliss",
                color: "#fff",
                fontSize: {
                  xs: "24px", // font size for extra small screens
                  sm: "32px", // font size for small screens
                  md: "40px", // font size for medium screens
                  lg: "48px", // font size for large screens
                  xl: "56px", // font size for extra large screens
                },
                fontWeight: "normal",
                fontStyle: "normal",
                textAlign: "start",
                paddingTop: 2,
              }}
            >
              {" "}
              OUR COLLECTION{" "}
            </Typography>

            <div className="home-imagediv">
              {Images.map((item, index) => (
                <div className="image-container" key={index}>
                  <img
                    loading="lazy"
                    src={item.src}
                    alt={item.alt}
                    onClick={() => pageNavigate("collection")}
                  />
                </div>
              ))}
            </div>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding:'30px 30px'
                // marginBottom: "40px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#272829",
                  padding: "5px 10px ",
                  borderRadius: "0px",
                  width: "200px",
                  "&:hover": {
                    backgroundColor: "#7B967A",
                    color: "#fff",
                    fontWeight: "normal",
                  },
                  fontFamily: "pureblissPoppinsLight",
                  fontSize: "16px",
                  fontWeight: "bold",
                  // width=20,
                }}
                onClick={() => pageNavigate("shop")}
              >
                Shop now
              </Button>
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Home;
