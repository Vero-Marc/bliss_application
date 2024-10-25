import { ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react'
import theme from '../../Theme';
import './styles/Sidebar.css';
import Dashboard from './AdminDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';

function AdminHome() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <ThemeProvider theme={theme}>
        <Dashboard/> 
    </ThemeProvider> 
  )
}

export default AdminHome;

