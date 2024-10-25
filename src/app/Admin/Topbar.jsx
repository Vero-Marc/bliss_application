import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './styles/Sidebar.css';
const Topbar = () => {
  return (
    // <AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
    //   <Toolbar className="Navbar">
    //     <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
    //       Bliss Admin
    //     </Typography>
    //     {/* <MenuIcon  /> */}
    //     <Button color="inherit">Logout</Button>
    //   </Toolbar>
    // </AppBar>
     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
     <Toolbar>
       <IconButton
         edge="start"
         color="inherit"
         aria-label="menu"
        //  onClick={toggleDrawer(true)}
         sx={{ display: { xs: 'block', md: 'none' } }}
       >
         <MenuIcon />
       </IconButton>
       <Typography variant="h6" sx={{ flexGrow: 1 }}>
         Bliss Admin
       </Typography>
       <Box sx={{ display: { xs: 'none', md: 'block' } }}>
         <Button color="inherit">Logout</Button>
       </Box>
     </Toolbar>
   </AppBar>
  );
//   const [openDrawer, setOpenDrawer] = React.useState(false);

// const handleDrawerOpen = () => {
//   setOpenDrawer(true);
// };

// const handleDrawerClose = () => {
//   setOpenDrawer(false);
// };

// return (
//   <div>
//     <AppBar position="static">
//       <Toolbar>
//         <MenuIcon onClick={handleDrawerOpen} />
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           eCommerce PHP
//         </Typography>
//       </Toolbar>
//     </AppBar>

//     <Drawer open={openDrawer} onClose={handleDrawerClose}>
//       <List>
//         <ListItem button>
//           <ListItemIcon>{/* Add icon here */}</ListItemIcon>
//           <ListItemText primary="Dashboard" />
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon>{/* Add icon here */}</ListItemIcon>
//           <ListItemText primary="Website Settings" />
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon>{/* Add icon here */}</ListItemIcon>
//           <ListItemText primary="Shop Settings" />
//         </ListItem>
//         {/* ... other menu items ... */}
//       </List>
//     </Drawer>

//     {/* Rest of your admin dashboard content here */}
//   </div>
// );

};

export default Topbar;
