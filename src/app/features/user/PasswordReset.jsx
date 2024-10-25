import React, { useContext, useState } from "react";
// import {GoogleLogin} from ''

import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  // Link,
  Button,
  Card,
} from "@mui/material";
import "./style/user.css";
// import AuthContext from "../../services/AuthContext";
import Popup from "../../components/Popup";

import contact_img from "../../../assets/images/contact-img.jpg";
import { environment } from "../../../environments/environment";
import AuthContext from "../../services/AuthContext";

function PasswordReset() {
  const [flag, setFlag] = useState({open:false , message:""});
  const [pageValue, setPageValue] = useState({ email:"" });
  const {getProductsData} = useContext(AuthContext);
  const baseUrl = environment.API_ENDPOINT 
  const currentPath = window.location.origin;
  
  const handleChange = (e) => {
    setPageValue((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const [errors, setErrors] = useState({
    email: "",
  });

  const validate = async() => {
    let tempErrors = { ...errors };
    tempErrors.email = /\S+@\S+\.\S+/.test(pageValue.email)
      ? ""
      : "Email is not valid.";

      try {
        const response = await getProductsData("list_customer");
        if (response && Array.isArray(response.data)) {
          const emailExists = response.data.some(user => user.email === pageValue.email);
          if (!emailExists) {
            tempErrors.email = "Email id does not exist";
          } else if (!(/\S+@\S+\.\S+/.test(pageValue.email))) { 
            tempErrors.email = "Email is not valid.";
          } else {
            tempErrors.email = '';
          }
        } else {
          tempErrors.email = "";
        }
      
    } catch (error) {
      tempErrors.email = "An error occurred while checking email.";
      console.error("Error fetching customer data:", error);
    }  
    setErrors(tempErrors);

    // Check if there are no errors
    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    const isValid = await validate();
    if (isValid) {
      // const response = await loginUser(pageValue);
      try {
        const response= await fetch(`${baseUrl}/reset_password`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({'username': e?.target.username.value, 'password': e?.target.password.value})
            body: JSON.stringify({email:pageValue.email,path:currentPath})
        })
        
        if(response.ok){
          setFlag({open: true , message:"Password reset mail has been sent to your registered e-mail"})
        }
        
        if (!response.ok) {
            throw new Error('Failed to send mail');
        }
            
    } catch (error) {
        console.log(error)
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
          severity="success"
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
                Reset your password!
              </Typography>

              <Box component="form">
               
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  value={pageValue.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email}
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
                 Send Password Reset Link
                </Button>
              </Box>
            </Card>
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

export default PasswordReset;
