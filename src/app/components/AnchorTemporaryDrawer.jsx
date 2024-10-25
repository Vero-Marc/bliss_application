// src/components/AnchorTemporaryDrawer.js
import React, { useContext } from 'react';
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CollectionsIcon from '@mui/icons-material/Collections';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LoginIcon from '@mui/icons-material/Login';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AuthContext from '../services/AuthContext';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LoginOutIcon from '@mui/icons-material/Logout'
const AnchorTemporaryDrawer = ({ open, toggleDrawer }) => {
  const { user,logoutUser,userLoginData } = useContext(AuthContext);
  const menuItems = [
    { text: 'HOME', icon: <HomeIcon />, link: '/' },
    { text: 'SHOP', icon: <ShoppingCartIcon />, link: '/shop' },
    { text: 'CRAFTMANSHIP', icon: <HandshakeIcon />, link: '/craftsmanship' },
    { text: 'COLLECTION', icon: <CollectionsIcon />, link: '/collection' },
    { text: 'CONTACT', icon: <PermContactCalendarIcon />, link: '/contact' },
  ];
  
  const loginItems = [
    { text: `${userLoginData}`, icon: <AccountCircle />, link: '/userprofile' },
    { text: 'CART', icon: <AddShoppingCartIcon />, link: '/cart' },
    { text: 'ORDER DETAILS', icon:  <ReceiptIcon/>, link: '/orders' },
    { text: 'LOGOUT', icon: <LoginOutIcon />, onClick:logoutUser }
  ];
  
  const guestItems = [
    { text: 'CART', icon: <AddShoppingCartIcon />, link: '/cart' },
    { text: 'LOGIN', icon: <LoginIcon />, link: '/login' }
  ];
  
  const userItems = [
    ...(user?.uid ? loginItems : guestItems)
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem className='list-item' key={item.text} disablePadding component={Link} to={item.link}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {userItems.map((item) => (
          <ListItem className='list-item' key={item.text} disablePadding component={item.link ? Link : 'div'} to={item.link} onClick={item.onClick}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      {list('left')}
    </Drawer>
  );
};

export default AnchorTemporaryDrawer;
