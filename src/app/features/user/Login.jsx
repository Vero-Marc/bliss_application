import React, { useState, useContext } from "react";
// import {GoogleLogin} from ''

import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  // Link,
  Button,
  Card,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./style/user.css";
import AuthContext from "../../services/AuthContext";
import Popup from "../../components/Popup";

import contact_img from "../../../assets/images/contact-img.jpg";
import search from "../../../assets/media/search.png";
// import facebook from "../../../assets/media/facebook.png";
// import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [flag, setFlag] = useState({open:false , message:""});
  const [pageValue, setPageValue] = useState({ username: "", password: "" });
  const { loginUser, google_login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPageValue((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validate = () => {
    let tempErrors = { ...errors };
    tempErrors.username = /\S+@\S+\.\S+/.test(pageValue.username)
      ? ""
      : "Email is not valid.";
    tempErrors.password =
      pageValue.password.length >= 6
        ? ""
        : "Password must be at least 6 characters.";
  
    setErrors(tempErrors);

    // Check if there are no errors
    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    if (validate()) {
      const response = await loginUser(pageValue);
      if (response) {
        if (response.ok) {
          const redirectUrl = localStorage.getItem("redirectAfterLogin");
          if (redirectUrl) {
            navigate(redirectUrl);
            localStorage.removeItem("redirectAfterLogin");
          } else {
            navigate("/");
          }
        } else {
          setFlag({open:true,message:response.detail});
        }
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFlag({open:false,message:""});
  };

  return (
    <Container className="login-section" maxWidth="mx">
      <div className="login-section">
        <Popup
          open={flag.open}
          handleClose={handleClose}
          severity="error"
          message={flag.message}
        />
        <Grid
          container
          spacing={12}
          sx={{ paddingRight: { md: 10 }, paddingLeft: { md: 10 } }}
        >
          <Grid item xs={12} md={6} justifyContent="start">
            <Card
              className="login-form"
              sx={{
                background: "none",
                boxShadow: "none",
                fontFamily: "pureblissPoppinsLight",
              }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: "start", fontWeight: 600, color: "#6B4028" }}
              >
                Welcome Back!
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: "start",
                  mb: 3,
                  fontWeight: 600,
                  fontFamily: "pureblissPoppinsLight",
                }}
              >
                Didn’t have an account ?
                <Button className="nav-head" component={Link} to="/signup">
                  {" "}
                  Sign up
                </Button>
                {/* <Link href="signup" underline="none"
                                    sx={{
                                        color: '#151515',
                                        ml: 1,
                                        ontWeight: 600
                                    }}>Sign up</Link> */}
              </Typography>

              <Box component="form">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="username"
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  error={!!errors.username}
                  helperText={errors.username}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#6B4028", // Custom border color
                        border: "2px solid #6B4028",
                        borderRadius: "10px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#6B4028", // Custom border color on hover
                        border: "2px solid #6B4028",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B4028", // Custom border color when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#151515", // Custom label color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#6B4028", // Custom label color when focused
                    },
                  }}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  name="password"
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#6B4028", // Custom border color
                        border: "2px solid #6B4028",
                        borderRadius: "10px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#6B4028", // Custom border color on hover
                        border: "2px solid #6B4028",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B4028", // Custom border color when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#151515", // Custom label color
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#6B4028", // Custom label color when focused
                    },
                  }}
                />

                {/* <Link href="#" underline="none" sx={{ display: 'block', mt: 1, float: 'right', color: '#151515', fontWeight: 600 }}>
                                    Forgot Password?
                                </Link> */}
                <div className="flexclass">
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "#151515",
                          "&.Mui-checked": {
                            color: "#6B4028",
                          },
                        }}
                      />
                    }
                    label="Remember me"
                    sx={{
                      mt: 2,
                      fontSize: "14px",
                      "& .MuiFormControlLabel-label.Mui-focused": {
                        fontWeight: 600,
                        fontFamily: "pureblissPoppinsLight",
                      },
                    }}
                  />
                  <Button class="linkclass" component={Link} to="/password-reset" > Forgot Password? </Button>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#6B4028", // Custom background color
                    color: "white", // Custom text color
                    padding: "15px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#6B4028", // Custom hover background color
                    },
                    fontFamily: "pureblissPoppinsLight",
                    fontSize: "16px",
                  }}
                  onClick={() => handleSubmit()}
                >
                  Log In
                </Button>
              </Box>
            </Card>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    fontWeight: 600,
                    fontFamily: "pureblissPoppinsLight",
                  }}
                >
                  Or login with
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <IconButton color="primary">
                  <img
                    loading="lazy"
                    src={search}
                    alt="google"
                    onClick={() => google_login()}
                  />
                </IconButton>
                {/* <IconButton color="primary">
                  <img loading="lazy" src={facebook} alt="facebook" />
                </IconButton> */}
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} justifyContent="end">
            <Box className="login-img">
              <img loading="lazy" src={contact_img} alt="Leaf" />
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default Login;
