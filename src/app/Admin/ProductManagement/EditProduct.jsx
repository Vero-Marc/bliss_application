

import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box, Checkbox, FormControlLabel,
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AuthContext from '../../services/AuthContext';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from '../../components/Popup';

const UploadContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const EditProduct = () => {
  const [productData, setProductData] = useState({
    product_name: '',
    product_image : [],
    quantity: '',
    original_price: '',
    selling_price: '',
    description: '',
    trending:false,
    availability:false
  });

  const {update,Fetch,imageUpload,ImageFetch} = useContext(AuthContext)

  const { productId } = useParams();

  const [errors, setErrors] = useState({
    product_name: '',
    product_image: '',
    // quantity: '',
    original_price:'',
    selling_price:'',
    description:'',
  });
  const [open, setOpen] = useState(false);
  const [imageArray,setImageArray] = useState([])

useEffect(()=>{
    async function fetchData(){
      const response = await Fetch({product_id: productId},'get_product');
      let productDataResponse = response?.data ? response?.data: {}
      let files = [];
      
      if (response && Array.isArray(productDataResponse.product_image)) {
        // Create an array of promises for fetching images
          const imagePromises = productDataResponse.product_image.map(async (img_path) => {
          const imgresponse = await ImageFetch({ "file_path": img_path }, 'get_file');
          const imgurl = URL.createObjectURL(imgresponse);
          return {
            file: imgresponse,
            preview: imgurl,
          };
        });

        // Wait for all image fetches to complete
        files = await Promise.all(imagePromises);

        // Update the state with the fetched images
        let DataResponse = { ...productDataResponse, product_image: files };
        
        setProductData(DataResponse);
        setImageArray(productDataResponse.product_image)
      } else {
        setProductData(productDataResponse);
      }
    }
    fetchData()
    return ()=>{
      setProductData((data)=> {return data} )
    }
  },[Fetch, ImageFetch, productId])
  
  const validate = () => {
    let tempErrors = { ...errors };
    tempErrors.product_name = (productData.product_name !=='') ? '' : 'Product name is required.';
    tempErrors.description = (productData.description !=='') ? '' : 'Description is required.';
    tempErrors.original_price = (productData.original_price !=='') ? '' : 'Product price is required.';
    tempErrors.product_image = (productData.product_image.length !== 0) ? '' : 'Upload product images.';
    setErrors(tempErrors);

    // Check if there are no errors
    return Object.values(tempErrors).every((error) => error === '');
  };
  
  const handleSubmit =async (event) => {
    event.preventDefault();
    
  if(validate()){
     const input = {
      product_id:productData.id,
      product_name: productData.product_name,
      trending: productData.trending ,
      availability: productData.availability,
      product_image : imageArray,
      quantity: productData.quantity,
      original_price:productData.original_price,
      selling_price: productData.selling_price,
      description: productData.description,
     }
     
     const res = await update(input,'update_product');
    //  const data = await res.json()
    // const data = await res.json();
     if (res.ok) {
      setOpen(true);
     }
    }
  };

  const handlecheckChange = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = async(e) => {
    e.preventDefault();
    const file = e.target.files[0]
    
    if (!file) {
      console.error('No file selected');
      return;
    }

    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    

    const formData = new FormData();
    formData.append('file', file);
    formData.append('source_field', 'item_image');  


    try {
      const response = await imageUpload(formData,`upload_file`)
      const image_path = response?.data
      var file_path = image_path['tmp_file_name']
      
      setImageArray ((prev) => [...prev, file_path])
      
    } catch (error) {
      console.error('Error:', error);
    }
    setProductData((prevProduct) => ({...prevProduct, product_image : [...prevProduct.product_image, ...newImages]}));

  }

  
  
  const handleRemoveImage = (index) => {
    setProductData((prevProduct)=>({...prevProduct, product_image : prevProduct.product_image.filter((_, i) => i !== index)}) );
    setImageArray(prevItems => prevItems.filter((item, i) => i !== index));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ marginLeft: { xs: '0px', md: '240px' }, marginTop: '50px', padding: 3, transition: 'margin-left 0.3s ease' }}>

      <UploadContainer>
        <Typography variant="h5" gutterBottom>
          Update Product
        </Typography>
        <form onSubmit={handleSubmit}>
       <Popup open={open} handleClose={handleClose} severity="success" message={"Product Uploaded Successfully"}/>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="product_name"
                value={productData.product_name}
                onChange={handleChange}
                fullWidth
                // required
                error={!!errors.product_name}
                helperText={errors.product_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                // required
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Price"
                name="original_price"
                value={productData.original_price}
                onChange={handleChange}
                type="number"
                fullWidth
                // required
                error={!!errors.original_price}
                helperText={errors.original_price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discount Price"
                name="selling_price"
                value={productData.selling_price}
                onChange={handleChange}
                type="number"
                fullWidth
                // required
              />
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                type="number"
                fullWidth
                // required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <FormControlLabel
        control={<Checkbox name="availability" checked={productData.availability} onChange={handlecheckChange} />}
        label="Is the product available?"
      />
      </Grid>
      <Grid item xs={12} sm={12}>
          <FormControlLabel
        control={<Checkbox name="trending" checked={productData.trending} onChange={handlecheckChange} />}
        label="Is the product trending?"
      />
      </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="body1" color="textSecondary">
               Image Upload
              </Typography>
            <Box
        sx={{
          border: '2px dashed #cccccc',
          borderRadius: '4px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#f5f5f5' },
        }}
        component="label"
      >
        <CloudUploadIcon sx={{ fontSize: 50, color: '#cccccc',pt:4 }} />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
      </Box>
            <span style={{color:'red'}}> {errors.product_image}</span>
        
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {productData.product_image.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ position: 'relative' }}>
              <img loading="lazy"
                src={image.preview}
                alt={`upload-${index}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                <DeleteIcon/>
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Upload Product
              </Button>
            </Grid>

    
          </Grid>
        </form>
      </UploadContainer>
    </Container>
  );
};

export default EditProduct;

