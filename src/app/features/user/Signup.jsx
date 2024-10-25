import React, { useContext, useState } from 'react';
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
    //  "privacy policy, t&c, refund policy" , 
    Card,
    IconButton,
} from '@mui/material';
import './style/user.css';
import { Link, useNavigate } from 'react-router-dom';
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
import { environment } from '../../../environments/environment';

import contact_img from '../../../assets/images/contact-img.jpg'
import search from '../../../assets/media/search.png'
// import facebook from '../../../assets/media/facebook.png'
import AuthContext from '../../services/AuthContext';
import Popup from '../../components/Popup';
// import FacebookLogin from 'react-facebook-login';

function Signup() {
   
    const [signupData,setSignupData] = useState({username:"",email:"",mobile:"",password:""})
    const baseUrl = environment.API_ENDPOINT 
    const { google_login ,getProductsData} = useContext(AuthContext);
    const [open,setOpen] = useState(false)
    const handleChange = (e) =>{
        setSignupData((data)=> {return {...data,[e.target.name]:e.target.value}})
  }
  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    mobile:''
  });

  const validate = async() => {
    let tempErrors = { ...errors };
    tempErrors.username = signupData.username ? '' : 'Username is required.';
    // tempErrors.password = signupData.password.length >= 6 ? '' : 'Password must be at least 6 characters.';
    if (signupData.password.length < 6) {
        tempErrors.password = 'Password must be at least 6 characters.';
      }
      // Check for at least one uppercase letter
      else if (!/[A-Z]/.test(signupData.password)) {
        tempErrors.password = 'Password must contain at least one uppercase letter.';
      }
      // Check for at least one lowercase letter
      else if (!/[a-z]/.test(signupData.password)) {
        tempErrors.password = 'Password must contain at least one lowercase letter.';
      }
      // Check for at least one digit
      else if (!/\d/.test(signupData.password)) {
        tempErrors.password = 'Password must contain at least one digit.';
      }
      // Check for at least one special character
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(signupData.password)) {
        tempErrors.password = 'Password must contain at least one special character.';
      } else {
        tempErrors.password = ''
      }
      
    try {
          const response = await getProductsData("list_customer");
          if (response && Array.isArray(response.data)) {
            const emailExists = response.data.some(user => user.email === signupData.email);
            const mobileExists =  response.data.some(user => user.mobile_number === signupData.mobile);
            if (emailExists) {
              tempErrors.email = "Email id already exists";
            } else if (!(/\S+@\S+\.\S+/.test(signupData.email))) { 
              tempErrors.email = "Email is not valid.";
            } else {
              tempErrors.email = '';
            }

            if(mobileExists) {
                tempErrors.mobile = "Mobile number already exists";
            } else if (!(/^[0-9]{10}$/.test(signupData.mobile))){
                tempErrors.mobile = "Enter valid mobile number";
            } else {
                tempErrors.mobile = ""
            }
          } else {
            tempErrors.email = "";
            tempErrors.mobile = ""
          }
        
      } catch (error) {
        tempErrors.email = "An error occurred while checking email.";
        console.error("Error fetching customer data:", error);
      }
   
    setErrors(tempErrors)

    // Check if there are no errors
    return Object.values(tempErrors).every((error) => error === '');
  };
  
    const handleSubmit = async(event)=>{
        const isValid = await validate();
        if (isValid){
            try {
                const response= await fetch(`${baseUrl}/add_customer`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body: JSON.stringify({'username': e?.target.username.value, 'password': e?.target.password.value})
                    body: JSON.stringify(signupData)
                })
                if (!response.ok) {
                    throw new Error('Failed to login');
                }
                  setOpen(true)
                  navigate('/login')
                    
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };   
    //   const responseFacebook = (response) => {
    //     console.log(response);
    //   }
  return (
    <Container className='login-section' maxWidth="mx">
    <div className='login-section'>
        <Grid container spacing={12} sx={{ paddingRight: { md: 10 }, paddingLeft: { md: 10 } }}>
    <Popup open={open} handleClose={handleClose} severity="success" message={"Successfully signed in!"}/>
            <Grid item xs={12} md={6} justifyContent="start">
                <Card className='login-form' sx={{ background: 'none', boxShadow: 'none', fontFamily: 'pureblissPoppinsLight' }}>
                    <Typography variant="h5" sx={{ textAlign: 'start', fontWeight: 600, color: '#6B4028' }}>
                        Welcome Back!
                    </Typography>

                    <Typography variant="body1"
                        sx={{ textAlign: 'start', mb: 3, fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                        Already have an account ? <Button className="nav-head" component={Link} to="/login">Login</Button>
                        {/* <Link href="/login" underline="none"
                            sx={{
                                color: '#151515',
                                ml: 1,
                                ontWeight: 600
                            }}>Log in</Link> */}
                    </Typography>
                    <Box component="form"  >
                        <TextField
                            label="Username"
                            variant="outlined"
                            name="username"
                            fullWidth
                            onChange={(e)=> handleChange(e)}
                            margin="normal"
                            error={!!errors.username}
                            helperText={errors.username}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#6B4028', // Custom border color
                                        border: '2px solid #6B4028',
                                        borderRadius: '10px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#6B4028', // Custom border color on hover
                                        border: '2px solid #6B4028'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6B4028', // Custom border color when focused
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#151515', // Custom label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#6B4028', // Custom label color when focused
                                },
                            }}
                        />
                         <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            fullWidth
                            onChange={(e)=> handleChange(e)}
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#6B4028', // Custom border color
                                        border: '2px solid #6B4028',
                                        borderRadius: '10px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#6B4028', // Custom border color on hover
                                        border: '2px solid #6B4028'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6B4028', // Custom border color when focused
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#151515', // Custom label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#6B4028', // Custom label color when focused
                                },
                            }}
                        />
                         <TextField
                            label="Mobile Number"
                            variant="outlined"
                            name="mobile"
                            fullWidth
                            error={!!errors.mobile}
                            helperText={errors.mobile}
                            onChange={(e)=> handleChange(e)}
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#6B4028', // Custom border color
                                        border: '2px solid #6B4028',
                                        borderRadius: '10px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#6B4028', // Custom border color on hover
                                        border: '2px solid #6B4028'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6B4028', // Custom border color when focused
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#151515', // Custom label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#6B4028', // Custom label color when focused
                                },
                            }}
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            name="password"
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password}
                            fullWidth
                            onChange={(e)=> handleChange(e)}
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#6B4028', // Custom border color
                                        border: '2px solid #6B4028',
                                        borderRadius: '10px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#6B4028', // Custom border color on hover
                                        border: '2px solid #6B4028'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#6B4028', // Custom border color when focused
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#151515', // Custom label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#6B4028', // Custom label color when focused
                                },
                            }}
                        />
                         {/*  <Link href="#" underline="none" sx={{ display: 'block', mt: 1, float: 'right', color: '#151515', fontWeight: 600 }}>
                            Forgot Password?
                         </Link> */}
                        <FormControlLabel control={<Checkbox
                            sx={{
                                color: '#151515',
                                '&.Mui-checked': {
                                    color: '#6B4028',
                                },
                            }}
                        />}
                            label="Remember me"
                            sx={{
                                mt: 2,
                                fontSize: '14px',
                                '& .MuiFormControlLabel-label.Mui-focused': {
                                    fontWeight: 600,
                                    fontFamily: 'pureblissPoppinsLight',
                                },
                            }}
                        />

                        <Button variant="contained" color="primary" fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: '#6B4028', // Custom background color
                                color: 'white', // Custom text color
                                padding: '15px',
                                borderRadius: '10px',
                                '&:hover': {
                                    backgroundColor: '#6B4028', // Custom hover background color
                                },
                                fontFamily: 'pureblissPoppinsLight',
                                fontSize: '16px',

                            }} onClick={()=>handleSubmit()}>
                           Sign up
                        </Button>
                    </Box>
                </Card>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Typography variant="body2" sx={{ mr: 1, fontWeight: 600, fontFamily: 'pureblissPoppinsLight' }}>
                            Or login with
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <IconButton color="primary">
                    <img loading="lazy" src={search} alt="google" onClick={()=>google_login()}/>
                         </IconButton>
                        {/* <IconButton color="primary">
                            <img loading="lazy" src={facebook} alt="facebook" />
                        </IconButton> */}
                         {/* <FacebookLogin
                            appId="1088597931155576"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="my-facebook-button-class"
                            icon={<TiSocialFacebookCircular />}
                        />, */}
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
  )
}

export default Signup