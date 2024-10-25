import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, CssBaseline, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AuthContext from '../services/AuthContext';
// import useMediaQuery from '@mui/material/useMediaQuery';

const NavbarAndSidebar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { logoutUser } = useContext(AuthContext)
  // const isMobile = useMediaQuery('(max-width:768px)');
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  
  const userLogout = () =>{
    logoutUser()
  }

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
       <List>
         <ListItem button component={Link} to="/">
         <HomeIcon sx={{ marginRight: 2 }} />
           <ListItemText primary="Dashboard" />
         </ListItem>
         <ListItem button component={Link} to="/adm/productlist">
{/* <StorefrontIcon /> */}
         <ShoppingCartIcon sx={{ marginRight: 2 }}/>
           <ListItemText primary="Products" />
         </ListItem>
         <ListItem button component={Link} to="adm/orderlist">
{/* <ListAltIcon /> */}
         <ReceiptIcon sx={{ marginRight: 2 }}/>
           <ListItemText primary="Orders" />
         </ListItem>
       </List>
     
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Pure bliss Admin
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button color="inherit" onClick={() => userLogout()}>Log out</Button>
            {/* <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: 'block', md: 'none' }
        }}
      >
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
        {drawerContent}
      </Drawer>

      {/* Sidebar for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box', overflowX: 'hidden' },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>

      {/* Main content area */}
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4">Welcome to My Website</Typography>
        <Typography paragraph>
          This is the main content area. Resize the window to see the responsive navbar and sidebar in action.
        </Typography>
      </Box> */}
    </Box>
  );
};

export default NavbarAndSidebar;
