// src/components/NavBar.js
import React, { useState, useEffect, useContext } from "react";
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BLISSlogopng from "../../assets/images/BLISSlogopng.png";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DragHandleIcon from "@mui/icons-material/DragHandle";
// import useMediaQuery from '@mui/material/useMediaQuery';
// import '../../fonts.css';
import AnchorTemporaryDrawer from "../components/AnchorTemporaryDrawer";
import AuthContext from "../services/AuthContext";

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logoutUser, userLoginData } = useContext(AuthContext);
  const [isSticky, setIsSticky] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);
  // const isMobile = useMediaQuery('(max-width:768px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const totalCartList = localStorage.getItem("cartList")
    ? localStorage.getItem("cartList")
    : 0;
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateClick = () => {
    // Handle the update option click (e.g., navigate to the update profile page)
    navigate("/userprofile");
    handleMenuClose();
  };

  const userLogout = () => {
    logoutUser();
    handleMenuClose();
  };

  const handleOrdersClick = () => {
    navigate("/orders");
    handleMenuClose();
  };

  return (
    <>
      <Box className={`nav-bar-main ${isSticky ? "sticky" : ""}`}>
        <Toolbar>
          <Container class="nav-bar-head">
            {/* <Box className="hideondesktop" >
              <IconButton color="inherit"  onClick={toggleDrawer(true)}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  border: '1px solid #BBBBBB',
                  borderRadius: '10px',
                  p: 1,
                }}>
                 <DragHandleIcon sx={{ color: '#3F4441' }} /> 
              </IconButton>
              </Box> */}
            <Box
              className="hideondesktop"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
              }}
            >
              <IconButton
                color="inherit"
                onClick={toggleDrawer(true)} // Ensure this is a function, not a call
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  border: "1px solid #BBBBBB",
                  borderRadius: "10px",
                }}
              >
                <DragHandleIcon sx={{ color: "#3F4441" }} />
              </IconButton>

              <img
                loading="lazy"
                src={BLISSlogopng} // Replace with your logo path
                alt="Company Logo"
                style={{ height: "60px" }} // Adjust size and margin as needed
              />
            </Box>

            <Box className="left-group hideonmobile" component="div">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  loading="lazy"
                  src={BLISSlogopng} // Replace with your logo path
                  alt="Company Logo"
                  style={{ height: "60px" }} // Adjust size and margin as needed
                />
              </Box>
              <Button component={Link} to="/" color={"inherit"}>
                <Typography
                  className={`nav-head ${currentPath === '/' ? 'active' : ''}`}
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    fontFamily: "pureblissPoppinsLight",
                    letterSpacing: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  Home
                </Typography>
              </Button>
              <Button color="inherit" component={Link} to="/shop">
                <Typography
                  className={`nav-head ${currentPath === '/shop' ? 'active' : ''}`}
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    fontFamily: "pureblissPoppinsLight",
                    letterSpacing: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  Shop
                </Typography>
              </Button>
              <Button color="inherit" component={Link} to="/craftsmanship">
                <Typography
                   className={`nav-head ${currentPath === '/craftsmanship' ? 'active' : ''}`}
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    fontFamily: "pureblissPoppinsLight",
                    letterSpacing: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  Craftsmanship
                </Typography>
              </Button>
              <Button color="inherit" component={Link} to="/collection">
                <Typography
                   className={`nav-head ${currentPath === '/collection' ? 'active' : ''}`}
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    fontFamily: "pureblissPoppinsLight",
                    letterSpacing: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  Collection
                </Typography>
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                <Typography
                   className={`nav-head ${currentPath === '/contact' ? 'active' : ''}`}
                  style={{
                    fontWeight: "lighter",
                    padding: "10px",
                    fontFamily: "pureblissPoppinsLight",
                    letterSpacing: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  Contact
                </Typography>
              </Button>
            </Box>

            <Box className="right-group hideonmobile" component="div">
              {user?.uid == null && (
                <Button color="inherit" component={Link} to="/login">
                  <AccountCircle />
                  <Typography
                     className={`nav-head ${currentPath === '/login' ? 'active' : ''}`}
                    style={{
                      fontWeight: "lighter",
                      padding: "10px",
                      fontFamily: "pureblissPoppinsLight",
                      letterSpacing: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Login
                  </Typography>
                </Button>
              )}
              {user?.uid != null && (
                <div>
                  <Button
                    color="inherit"
                    component={Link}
                    onClick={handleMenuOpen}
                  >
                    <AccountCircle />
                    <Typography
                       className={`nav-head`}
                      style={{
                        fontWeight: "lighter",
                        padding: "10px",
                        fontFamily: "pureblissPoppinsLight",
                        letterSpacing: "4px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {userLoginData}
                    </Typography>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      style={{
                        fontWeight: "lighter",
                        fontFamily: "pureblissPoppinsLight",
                        letterSpacing: "4px",
                        fontSize: "0.8rem",
                      }}
                      onClick={() => handleUpdateClick()}
                      className="nav-head"
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      style={{
                        fontWeight: "lighter",
                        fontFamily: "pureblissPoppinsLight",
                        letterSpacing: "4px",
                        fontSize: "0.8rem",
                      }}
                      onClick={() => handleOrdersClick()}
                      className="nav-head"
                    >
                      Order Details
                    </MenuItem>
                    <MenuItem
                      style={{
                        fontWeight: "lighter",
                        fontFamily: "pureblissPoppinsLight",
                        letterSpacing: "4px",
                        fontSize: "0.8rem",
                      }}
                      onClick={() => userLogout()}
                      className="nav-head"
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
              <Button color="inherit" component={Link} to="/cart">
                {/* <div className="icon-container"> */}
                <ShoppingCartIcon />{" "}
                {totalCartList !== "0" && totalCartList !== 0 && (
                  <span className="cart-count">{totalCartList}</span>
                )}
                <Typography
                  style={{
                    fontWeight: "lighter",
                    fontFamily: "pureblissPoppinsLight",
                    letterSpacing: "4px",
                    fontSize: "0.8rem",
                    padding: "10px",
                  }}
                  className={`nav-head ${currentPath === '/cart' ? 'active' : ''}`}
                >
                  Cart
                </Typography>
                {/* </div> */}
              </Button>
            </Box>
          </Container>
        </Toolbar>
      </Box>
      <AnchorTemporaryDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default NavBar;
