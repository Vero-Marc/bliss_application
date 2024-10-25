import React, { useCallback, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../productSlider/cardSlider.css"; // Ensure this matches the actual file name
// import '../../fonts.css';
import { Navigation, Pagination } from "swiper/modules"; // Correct import path for modules
import { useNavigate } from "react-router-dom";
import AuthContext from "../../services/AuthContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";

const CardSlider = ({
  insertData,
  handleClose,
  setOpen,
  settempCartItem,
  tempCartItem,
  productsList,
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const AddToCart = useCallback(
    async (product) => {
      if (user !== null) {
        const input = {
          product_id: product.id,
          product_qty: 1,
        };

        const res = await insertData(input, "add_to_cart");
        const count = localStorage.getItem("cartList")
          ? localStorage.getItem("cartList") + 1
          : 1;
        localStorage.setItem("cartList", count);
        // const data = await res.json()
        if (res.ok) {
          setOpen(true);
        }
      } else {
        const input = [
          {
            product_id: product.id,
            product_qty: 1,
            product_name: product.product_name,
            product_image: product.product_image,
            original_price: product.original_price,
            selling_price: product.selling_price,
            description: product.description,
          },
        ];
        const cartItems = [...tempCartItem, ...input];
        settempCartItem(cartItems);
        localStorage.setItem("guestusercart", JSON.stringify(cartItems));
        localStorage.setItem("cartList", cartItems.length);
        setOpen(true);
      }
    },
    [insertData, setOpen, settempCartItem, tempCartItem, user]
  );
  return (
    <div className="shop-container">
      <h2
        className="shop-title"
        style={{ fontFamily: '"pureblissPoppinsLight", serif' }}
      >
        Best in selling
      </h2>
      <div className="swiper-container">
        {/* {productsList} */}
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
          {/* {productsList} */}
          {productsList?.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="card">
                <img
                  loading="lazy"
                  src={product.imageUrl}
                  alt={`Product ${index + 1}`}
                  className="card-image"
                  onClick={() => navigate(`/productview/${product.id}`)}
                />
                <Tooltip title={product.product_name}>
                  <p className="card-description">{product.product_name}</p>
                </Tooltip>
                <p className="card-price">
                  Rs.
                  {product.selling_price === 0
                    ? product.original_price
                    : product.selling_price}
                </p>
                <button
                  className="card-button"
                  onClick={() => AddToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div className=" swiper-navBtn swiper-button-next"></div> */}
        <ArrowForwardIcon className="swiper-navBtn swiper-button-next" />
        <ArrowBackIcon className="swiper-button-prev swiper-navBtn" />
        {/* <div className="swiper-button-prev swiper-navBtn"></div> */}
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default CardSlider;
