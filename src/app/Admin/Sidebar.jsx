import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    
    <Drawer className='sidebar'
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          position: 'absolute',  // Makes the sidebar float over content
          top: '64px',            // Adjust based on top bar height
          left: 0,
          zIndex: 1100,
        },
      }}
      variant="permanent"
      anchor="left"
    >

      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/adm/productlist">
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="adm/orderlist">
          <ListItemText primary="Orders" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;