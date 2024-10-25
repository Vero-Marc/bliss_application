import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import AuthContext from '../../services/AuthContext';

const OrderTable = ({ order, buttonClick, actions }) => {
  if (!order) {
    console.error('Invalid order data:', order);
    return null;
  }
  
  return (
    <TableRow key={order.id}>
      <TableCell>{order.customer_name}</TableCell>
      <TableCell>
        <Typography variant="body2">Product: {order.product_name}</Typography>
        <Typography variant="body2">Quantity: {order.quantity}</Typography>
        {/* Uncomment if product details are required */}
        {/* {order.productDetails.map((detail) => (
          <Box key={detail.id}>
            <Typography variant="body2">{detail.name}</Typography>
            <Typography variant="body2">{detail.description}</Typography>
            <Typography variant="body2">Quantity: {detail.quantity}</Typography>
            <Typography variant="body2">Unit Price: {detail.unitPrice}</Typography>
          </Box>
        ))} */}
      </TableCell>
      <TableCell>
        <Typography variant="body2">Payment Details: {order.payment_id}</Typography>
        {/* Uncomment if additional payment info is needed */}
        <Typography variant="body2">Total Price: ₹{order.total_price}</Typography>
        <Typography variant="body2">Transaction ID: {order.transactionId}</Typography>
        <Typography variant="body2">Date: {order.date}</Typography>
      </TableCell>
      <TableCell> 
        {/* Uncomment if additional payment info is needed */}
        <Typography variant="body2">Address: {order.address}</Typography>
        <Typography variant="body2">Country: {order.country}</Typography>
        <Typography variant="body2">Zip Code: {order.pincode}</Typography>
        <Typography variant="body2">Email: {order.email}</Typography>
        <Typography variant="body2">Mobile: {order.phone }</Typography>
        
        </TableCell>
      <TableCell>{"Pending"}</TableCell>
      <TableCell>{order.status}</TableCell>
      {/* <TableCell>
        {actions.map((action, index) => (
          <Button key={index} variant="contained" color="primary" sx={{ marginRight: 1 }} onClick={() => buttonClick(action, order.id)}>
            {action}
          </Button>
        ))}
      </TableCell> */}
    </TableRow>
  );
};

const OrderDetails = ({ orders, buttonClick, actions }) => {
  if (!Array.isArray(orders)) {
    console.error('Invalid orders array:', orders);
    return (
      <TableRow>
        <TableCell colSpan={7}>Invalid data format</TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {orders.map((order) => (
        <OrderTable key={order.id} order={order} buttonClick={buttonClick} actions={actions} />
      ))}
    </>
  );
};

const OrderManagement = () => {
  const { getData } = useContext(AuthContext);
  // const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isSidebarOpen] = useState(true); // Assume default is open for this example

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await getData('list_orders');

        if (response && Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.warn('Response data is not an array:', response.data);
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders();
  }, [getData]);

  const buttonClick = async (action, orderId) => {
    // Handle button click actions here
  };

  const actions = useMemo(() => ['Mark Complete', 'Delete'], []);

  const ordersCol = useMemo(() => [
    { columnName: "Customer Name" },
    { columnName: "Product Details" },
    { columnName: "Payment Information" },
    { columnName: "Shipping Information" },
    // { columnName: "Payment Status" },
    { columnName: "Shipping Status" },
    { columnName: "Action" }
  ], []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // const filteredOrders = orders.filter((order) => {
  //   const searchMatch = order.customer.toLowerCase().includes(searchQuery.toLowerCase());
  //   const statusMatch = !selectedStatus || order.Status === selectedStatus;
  //   return searchMatch && statusMatch;
  // });

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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 2 }}>
        <Typography variant="h5">Manage Orders</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            label="Search Orders"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              {/* Add more statuses as needed */}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {ordersCol.map((col, index) => (
                <TableCell key={index}>{col.columnName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <OrderDetails orders={orders} buttonClick={buttonClick} actions={actions} />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderManagement;
