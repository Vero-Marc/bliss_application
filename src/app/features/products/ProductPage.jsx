import React, { useCallback, useContext } from "react";
import "../products/style/ProductPage.css";
import { useNavigate } from "react-router-dom";
// import '../../fonts.css';
import AuthContext from "../../services/AuthContext";
import { Box, Tooltip } from "@mui/material";
import AllProducts from "../../../assets/images/AllProducts.png";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
const ProductPage = ({
  insertData,
  handleClose,
  setOpen,
  settempCartItem,
  tempCartItem,
  productsList,
  setLoading,
}) => {

  const { user } = useContext(AuthContext);

  // const ShowProducts = useCallback(() =>{
  //   const products1 = [
  //     {
  //       imageUrl: "/main-images/UpComing.png",
  //       description: "Products will be added",
  //       price: "Rs.999.00"
  //     },
  //     {
  //       imageUrl: "/main-images/UpComing.png",
  //       description: "Products will be added",
  //       price: "Rs.199.00"
  //     },
  //     {
  //       imageUrl: "/main-images/UpComing.png",
  //       description: "Products will be added",
  //       price: "Rs.199.00"
  //     },
  //     {
  //       imageUrl: "/main-images/UpComing.png",
  //       description: "Products will be added",
  //       price: "Rs.999.00"
  //     },
  //     {
  //       imageUrl: "/main-images/UpComing.png",
  //       description: "Products will be added",
  //       price: "Rs.199.00"
  //     },
  //     {
  //       imageUrl: "/main-images/UpComing.png",
  //       description: "Products will be added",
  //       price: "Rs.199.00"
  //     },
  //    ]
  //    setnewProducts((data)=>{return [...data,...products1]})

  // },[])

  const navigate = useNavigate();
  const AddToCart = useCallback(
    async (product) => {
      if (user !== null) {
        const input = {
          product_id: product.id,
          product_qty: 1,
          // customer_id : user.uid,
          // created_by : userLoginData
        };

        const res = await insertData(input, "add_to_cart");
        if (res.ok) {
          setOpen(true);
        }
        const count = localStorage.getItem("cartList")
          ? localStorage.getItem("cartList") + 1
          : 1;
        localStorage.setItem("cartList", count);
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
        localStorage.setItem('cartList',cartItems.length)
        setOpen(true);
      }
    },
    [insertData, setOpen, settempCartItem, tempCartItem, user]
  );
  return (
    <div className="product-page">
      {/* <h2 className="title" style={{ fontFamily: '"pureblissPoppinsLight", serif',}}>Best in selling</h2> */}
      <h1
        className="shop-title"
        style={{ fontFamily: '"pureblissPoppinsLight", serif' }}
      >
        Products
      </h1>
      <div className="filter-sort">
        <span>
          FILTER BY:{" "}
          <select>
            <option>All Products</option>
          </select>
        </span>
        <span>
          SORT BY:{" "}
          <select>
            <option>Default</option>
          </select>
        </span>
      </div>
      <div className="product-grid">
        {/* {Array.isArray(productsList) && productsList?.length > 0 && productsList?.map((product, index) => ( */}
        {productsList?.map((product, index) => (
          <div className="product-card" key={index}>
            <img
              loading="lazy"
              src={product.imageUrl}
              alt={`Product ${index + 1}`}
              onClick={() => navigate(`/productview/${product.id}`)}
            />
            <Tooltip title={product.product_name}>
              <p className="card-description">{product.product_name}</p>
            </Tooltip>
            <p className="price">
              Rs.
              {product.selling_price === 0
                ? product.original_price
                : product.selling_price}
            </p>
            <button className="add-to-cart" onClick={() => AddToCart(product)}>
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
      {/* <button className="view-all">View all</button> */}
      <div className="promotions">
        <div className="promo-card bg-color-pink">
          <h5 className="h5class">
            Motivate Your Crew & Clients with our
          </h5>
          <h2 className="h2class">
            Corporate Gifting Options
          </h2>
          {/* <p style="fontFamily: 'Playfair Display', serif; font-weight: 400;"></p> */}
          <hr className="hrclass"/>
          <Box display="flex" justifyContent="center" alignItems="center" >
          <CardGiftcardIcon fontSize="large" sx={{ color: 'black' ,padding:'20px'}}/>
          </Box>
          {/* <p className="pclass">  
            {" "}
            Say thanks Lorem ipsum dolor sit amet. Ea saepe reprehenderit et
            exercitationem.
          </p> */}
        </div>
        <div className="promo-card promo-card-img">
          <img loading="lazy" src={AllProducts} alt="Promo 1" />
        </div>
        <div className="promo-card bg-color-green">
          <h5  className="h5class" >
            {" "}
            Order Boxes worth INR 500/- & Avail
          </h5>
          <h2 className="h2class">{`Free Shipping`}</h2>
          <hr className="hrclass"/>
          <Box display="flex" justifyContent="center" alignItems="center" >
      <LocalShippingIcon fontSize="large" sx={{ color: 'black' ,padding:'20px'}} />
    </Box>
          {/* <p className="pclass">
            We are making orem ipsum dolor sit amet. Ea saepe reprehenderit et
            exercitationem.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
