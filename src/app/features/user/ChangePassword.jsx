import React, { useContext, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";
import "./style/user.css";
import Popup from "../../components/Popup";
import contact_img from "../../../assets/images/contact-img.jpg";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../services/AuthContext";

function ChangePassword() {
  const [flag, setFlag] = useState({open:false , message:""});
  const [pageValue, setPageValue] = useState({ password:"" });
  const {userId} = useParams()
  const {contact}=useContext(AuthContext)
  const navigate =  useNavigate()
  const handleChange = (e) => {
    setPageValue((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };

  const [errors, setErrors] = useState({
    password: "",
  });

  const validate = () => {
    let tempErrors = { ...errors };
    if (pageValue.password.length < 6) {
        tempErrors.password = 'Password must be at least 6 characters.';
      }
      // Check for at least one uppercase letter
      else if (!/[A-Z]/.test(pageValue.password)) {
        tempErrors.password = 'Password must contain at least one uppercase letter.';
      }
      // Check for at least one lowercase letter
      else if (!/[a-z]/.test(pageValue.password)) {
        tempErrors.password = 'Password must contain at least one lowercase letter.';
      }
      // Check for at least one digit
      else if (!/\d/.test(pageValue.password)) {
        tempErrors.password = 'Password must contain at least one digit.';
      }
      // Check for at least one special character
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pageValue.password)) {
        tempErrors.password = 'Password must contain at least one special character.';
      } else {
        tempErrors.password = ''
      }
    setErrors(tempErrors);

    // Check if there are no errors
    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    if (validate()) {
      const response = await contact({userId:userId,password:pageValue.password},'change_password',);
      if(response.ok) {
          setFlag({open:true,message:"Password has been changed successfully!"})
          navigate('/login')
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
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  name="password"
                  value={pageValue.password}
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
                 Reset password
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

export default ChangePassword;
