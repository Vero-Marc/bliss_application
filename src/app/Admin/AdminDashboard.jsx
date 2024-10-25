// import React from 'react';
// // import { Container, Typography } from '@mui/material';

// // const Dashboard = () => {
// //   return (
// //     <Container>
// //       <Typography variant="h4" gutterBottom>
// //         Dashboard
// //       </Typography>
// //       {/* Add your dashboard content here */}
// //     </Container>
// //   );
// // };

// // export default Dashboard;


// import { Grid, Card, CardContent, Typography, Avatar, Box, Divider } from "@mui/material";
// // import { Line } from "react-chartjs-2";
// // import Chart from 'chart.js/auto';

// function Dashboard() {
//   const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//     datasets: [
//       {
//         label: "Page Views",
//         data: [30, 45, 28, 80, 99, 50, 65, 30, 70, 80, 55, 60],
//         backgroundColor: "rgba(255, 159, 64, 0.6)",
//         borderColor: "rgba(255, 159, 64, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Clicks",
//         data: [20, 35, 25, 40, 80, 60, 75, 40, 50, 70, 65, 85],
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Grid container spacing={2}>
//         {/* Top Row Cards */}
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Total Orders</Typography>
//               <Typography variant="h4">13,647</Typography>
//               <Typography color="textSecondary">+2.3% Last Week</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">New Leads</Typography>
//               <Typography variant="h4">9,526</Typography>
//               <Typography color="textSecondary">+4.8% Last Month</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Deals</Typography>
//               <Typography variant="h4">976</Typography>
//               <Typography color="textSecondary">-0.3% Last Month</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Received Revenue</Typography>
//               <Typography variant="h4">$123.6k</Typography>
//               <Typography color="textSecondary">-10.6% Last Month</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Performance Graph */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Performance</Typography>
//               {/* <Line data={data} /> */}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Conversions and Sessions by Country */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Conversions</Typography>
//               <Box>
//                 <Typography variant="h4">65.2%</Typography>
//                 <Typography color="textSecondary">Returning Customer</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Sessions by Country</Typography>
//               {/* Use a map component for country-specific sessions */}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Top Pages */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Top Pages</Typography>
//               {/* Use a table component to display top pages */}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Recent Orders */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Recent Orders</Typography>
//               <Divider />
//               <Box>
//                 <Typography>Order ID: #RB5012</Typography>
//                 <Typography>Customer Name: Anna H.</Typography>
//                 <Typography>Status: Completed</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default Dashboard;
import React from 'react';
import { Grid, Card, CardContent, Box, CardHeader } from "@mui/material";

const Dashboard = () => {
  const cardStyle = {
    transition: 'all 0.3s ease-in-out', // Smooth transition for hover effect
    backgroundColor: '#f1ecde', // Initial background color
    position: 'relative', // To allow absolute positioning for sliding background
    overflow: 'hidden', // To hide the overflow during slide-up effect

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white', // The background color that slides up on hover
      transform: 'translateY(100%)', // Start below the card
      transition: 'transform 0.3s ease-in-out',
    },

    '&:hover:before': {
      transform: 'translateY(0)', // Slide up on hover
    },

    '&:hover': {
      backgroundColor: 'transparent', // Background becomes transparent on hover to show the sliding background
    },
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        flexGrow: 1,
        p: 3,
        marginLeft: { xs: '0px', md: '240px' }, // Adjust margin based on screen size and sidebar state
        marginTop: '50px',
        transition: 'margin-left 0.3s ease', // Smooth transition for margin change
      }}
    >
      {/* Top Header (if needed) */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
        <Typography variant="h5">eCommerce PHP</Typography>
        <Typography variant="h6">Admin Panel</Typography>
      </Box> */}

      {/* Dashboard Content */}
      <Grid container spacing={2} sx={{ flexGrow: 1, padding: 2 }}>
        {/* Dashboard Tile */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <CardHeader title="Podcasts" />
            <CardContent>
              {/* Add content here */}0
            </CardContent>
          </Card>
        </Grid>

        {/* Website Settings */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <CardHeader title="Pending Orders" />
            <CardContent>
              0
            </CardContent>
          </Card>
        </Grid>

        {/* Shop Settings */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <CardHeader title="Completed Orders" />
            <CardContent>
              0
            </CardContent>
          </Card>
        </Grid>

        {/* Product Management */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <CardHeader title="Total Orders" />
            <CardContent>
              0
            </CardContent>
          </Card>
        </Grid>

        {/* Add more tiles as needed */}
      </Grid>
    </Box>
  );
};

export default Dashboard;
