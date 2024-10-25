import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../services/AuthContext';

const ProductTable = ({ product, buttonClick , actions}) => {
  if (!product) {
    console.error('Invalid product data:', product);
    return null;
  }

  return (
    <TableRow key={product.id}>
      <TableCell>
        <img loading="lazy" src={product.imageUrl} alt={product.product_name} width="50" height="50" />
      </TableCell>
      <TableCell>{product.product_name}</TableCell>
      <TableCell>₹ {product.original_price}</TableCell>
      <TableCell>₹ {product.selling_price === 0 ?  product.original_price : product.selling_price}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>{product.trending ? 'Yes' : 'No'}</TableCell>
      <TableCell>{product.availability ? 'Yes' : 'No'}</TableCell>
      <TableCell>
        {actions.map((action, index) => (
          <Button key={index} variant="contained" color="primary" sx={{ marginRight: 1 }} onClick={() => buttonClick(action, product.id)}>
            {action}
          </Button>
        ))}
      </TableCell>
    </TableRow>
  );
};

const ProductDetails = ({ products, buttonClick ,actions}) => {
  if (!Array.isArray(products)) {
    console.error('Invalid products array:', products);
    return (
      <TableRow>
        <TableCell colSpan={8}>Invalid data format</TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProductTable key={product.id} product={product} buttonClick={buttonClick} actions={actions}/>
      ))}
    </>
  );
};

const ProductManagement = () => {
  const { getData,ImageFetch,Delete } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isSidebarOpen] = useState(true); // Assume default is open for this example

  const productsCol = useMemo(() => [
    { columnName: "Product Image" },
    { columnName: "Product Name" },
    { columnName: "Price" },
    { columnName: "Offer Price" },
    { columnName: "Quantity" },
    { columnName: "Trending" },
    { columnName: "Availability" },
    { columnName: "Action" }
  ], []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getData('list_product');

        if (response && Array.isArray(response.data) ) {
             const updatedProducts = await Promise.all(response.data.map(async (product) => {
            // Fetch blob for the image
            const img_path = product.product_image[0]
            const imgresponse = await ImageFetch({ "file_path": img_path }, 'get_file');
            const imageUrl = URL.createObjectURL(imgresponse);
             
            return {
              ...product,
              imageUrl // Add the object URL to the product
            };
          }));
          
          setProducts(updatedProducts);

        } else {
          console.warn('Response data is not an array:', response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
    return () => {
      setProducts((data)=> data)
      // products.forEach((product) => {
      //   if (product.imageUrl) {
      //     URL.revokeObjectURL(product.imageUrl);
      //   }
      // });
    };
  }, [ImageFetch, getData]);



  const buttonClick = async(action, productId) => {
    if (action === "Edit") {
      navigate(`/adm/editproduct/${productId}`);
    } else {
      await Delete({product_id:productId},'delete_product');
      setProducts(products.filter((item) => item.id !== productId));
    }
    // Add handling for other actions if necessary
  };

  const actions = useMemo(()=>{
    return ['Edit','Delete']
  },[]) 

  return (
    <Box
      sx={{
        padding: 3,
        marginLeft: isSidebarOpen ? '240px' : '0px', // Adjust margin based on sidebar state
        marginTop: '50px',
        flexGrow: 1,
        transition: 'margin-left 0.3s ease', // Smooth transition
        '@media (max-width:600px)': {
          marginLeft: '0px', // Full-width on small screens
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h5">View Products</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/adm/productupload')}>Add Product</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {productsCol.map((col, index) => (
                <TableCell key={index}>{col.columnName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <ProductDetails products={products} buttonClick={buttonClick} actions={actions}/>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductManagement;
