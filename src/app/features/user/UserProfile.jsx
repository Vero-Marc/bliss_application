
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,Box,
  Grid
} from '@mui/material';
import { styled } from '@mui/system';
import './style/user.css';
import AuthContext from '../../services/AuthContext';
import Popup from '../../components/Popup';
import LoadingOverlay from '../../components/LoadingOverlay';
const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const UserProfile = () => {
  const { getData,update,setUserLoginData } = useContext(AuthContext)
  const [open,setOpen] = useState(false)
  const [profile, setProfile] = useState({
    customer_name: '',
    email: '',
    mobile_number: '',
    address: '',
    city:'',
    state:'',
    country:'',
    pincode:''
  });
  const [loading, setLoading] = useState(false);
  const prevEmail = useRef('')
  useEffect(()=>{
    
    async function fetchProducts(){
       setLoading(true)
        const response = await getData('get_customer');
        const userData = response?.data ? response?.data : {}
        setProfile(userData ? userData : {})
        prevEmail.current = userData.email
        setLoading(false)
      }
      fetchProducts()
      return ()=>{
        setProfile((data)=> {return data} )
      }
  },[getData])

  const handleChange =useCallback((e) => {
    setProfile((data)=> {return {...data,[e.target.name]:e.target.value}})
    // setUpdateData({
    //   ...updateData,
    //   [e.target.name]: e.target.value,
    // });
  },[])

  const [errors, setErrors] = useState({
    customer_name: '',
    email: '',
    mobile_number:'',
    address: '',
    city:'',
    state:'',
    country:'',
    pincode:''
  });

  const validate = useCallback(async() => {
    let tempErrors = { ...errors };
    const emailChanged = profile.email !== prevEmail.current;
    tempErrors.customer_name = profile.customer_name ? '' : 'Name is required.';
    tempErrors.mobile_number = /^[0-9]{10}$/.test(profile.mobile_number) ? '':'Enter valid mobile number';
    tempErrors.address = profile.address ? '' : 'Address is required.';
    tempErrors.city = profile.city? '' : 'City is required.';
    tempErrors.state = profile.state ? '' : 'State is required.';
    tempErrors.country = profile.country ? '' : 'Country is required.';
    tempErrors.pincode = profile.pincode ? '' : 'Pincode is required.';
    try {
      if (emailChanged) {
        // Fetch the data from API
        const response = await getData("list_customer");
    
        if (response && Array.isArray(response.data)) {
          const emailExists = response.data.some(user => user.email === profile.email);
          if (emailExists) {
            tempErrors.email = "Email id already exists";
          } else if (!(/\S+@\S+\.\S+/.test(profile.email))) { 
            tempErrors.email = "Email is not valid.";
          } else {
            tempErrors.email = '';
          }
        } else {
          tempErrors.email = "Failed to retrieve customer data.";
        }
      } else {
        tempErrors.email = '';
      }
    } catch (error) {
      tempErrors.email = "An error occurred while checking email.";
      console.error("Error fetching customer data:", error);
    } 
    setErrors(tempErrors)
         
    // Check if there are no errors
    return Object.values(tempErrors).every((error) => error === '');
  },[profile,errors,getData])

  const handleSubmit = useCallback(async(e) => {
    const isValid = await validate();
    if (isValid) {

      const input = {
          name: profile.customer_name,
          email: profile.email,
          mobile: profile.mobile_number,
          address: profile.address,
          city:profile.city,
          state:profile.state,
          country:profile.country,
          pincode: profile.pincode
      }
      
      const response = await update(input,'update_customer');
      if(response.ok){
        localStorage.setItem("userLoginDetails", profile.customer_name);
        setUserLoginData(profile.customer_name)
        setOpen(true)
      }
    }
  },[profile,update,setUserLoginData,validate])
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const customTextField ={
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
  }

  return (
    <div className="profile-div">
    <Container maxWidth="sm" className="profile_container" >
    <Popup open={open} handleClose={handleClose} severity="success" message={"Profile updated successfully"}/>
    {loading && <LoadingOverlay />}
      <ProfileContainer className="profile_container">
        <Typography variant="h5" gutterBottom class="nav-head">
          Update Profile
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // inputRef={nameInputRef}
                label="Name"
                name="customer_name"
                type="text"
                value={profile.customer_name}
                onChange={handleChange}
                fullWidth
                sx={customTextField}
                error={!!errors.customer_name}
                helperText={errors.customer_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                fullWidth
                sx={customTextField}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Mobile"
                name="mobile_number"
                type="mobile"
                value={profile.mobile_number}
                onChange={handleChange}
                fullWidth
                sx={customTextField}
                error={!!errors.mobile_number}
                helperText={errors.mobile_number}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                type="text"
                value={profile.address}
                onChange={(e)=> handleChange(e)}
                fullWidth
                sx={customTextField}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="city"
                type="text"
                value={profile.city}
                onChange={handleChange}
                fullWidth
                sx={customTextField}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                name="state"
                type="text"
                value={profile.state}
                onChange={handleChange}
                fullWidth
                sx={customTextField}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={6}>
            {/* <InputLabel id="Country">Country</InputLabel>
            <Select
            labelId="Country"
            name="country"
            id="payment-method"
            value={profile.country}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">Select Country</MenuItem>
           
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="PayPal">PayPal</MenuItem>
            <MenuItem value="GPay">GPay</MenuItem>
          </Select> */}
              <TextField
                label="Country"
                name="country"
                type="text"
                value={profile.country}
                onChange={handleChange}
                fullWidth
                sx={customTextField}
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Pincode"
                name="pincode"
                type="text"
                value={profile.pincode}
                onChange={handleChange}
                fullWidth
                sx={customTextField}
                error={!!errors.pincode}
                helperText={errors.pincode}
              />
            </Grid>
            <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
              <Button  variant="contained"    sx={{
                                        mt: 2,
                                        backgroundColor: '#6B4028', // Custom background color
                                        color: 'white', // Custom text color
                                        padding: '5px',
                                        borderRadius: '10px',
                                        // display:'flex',
                                        // justifyContent:'center',
                                        '&:hover': {
                                            backgroundColor: '#6B4028', // Custom hover background color
                                        },
                                        fontFamily: 'pureblissPoppinsLight',
                                        fontSize: '16px',
                                        width:'50%'
                                    }} onClick={()=> handleSubmit()}>
                Update Profile
              </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </ProfileContainer>
    </Container>
    </div>
  );
};

export default UserProfile;