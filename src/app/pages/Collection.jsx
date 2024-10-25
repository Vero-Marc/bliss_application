import React from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { Container } from 'react-bootstrap';
import './Craftsmanship.css';
import '../pages/style/collection.css';
import Collectiont from '../components/Collectiont';
import { useNavigate } from 'react-router-dom';

import CollectionPage from '../../assets/images/CollectionPage.png'

const Collection = () => {
  // const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:768px)');
  // const status = useSelector((state) => state.products.status);
  const navigate = useNavigate()
  const collection = [
    {
      id: 1,
      product_image: require('../../assets/images/GreyDhoop.jpeg'),
      description: 'Sambrani Dhoop Cups',
      selling_price: 'Rs.99.00'
    },
    {
      id: 2,
      product_image: require('../../assets/images/GreyStick.png'),
      description: 'Divine Premium Bathi',
      selling_price: 'Rs.259.00'
    },
    {
      id: 3,
      product_image: require('../../assets/images/GreyAgarbathi.png'),
      description: 'Agarbathi Insense Sticks',
      selling_price: 'Rs.999.00'
    }
  ];

  return (
    <div>
      <Container className="craftsmanship-container" component="div">
        <Box className="craftsmanship-img">
          <img loading="lazy" src={CollectionPage} alt="craftmanship" className="background-image" />
        </Box>
        <div className="collection-Content">
          <div className="collection-section">
            <h1 className='collection-head' >OUR COLLECTION</h1>
            <div className="collection-shop">
              {collection.map((item, index) => (
                <div className="collection-image" key={index}>
                  <img loading="lazy" src={item.product_image} alt="collection" className="imagecss"/>
                  <h2 variant="body1" className='our-collection'>{item.description}</h2>
                </div>
              ))}
            </div>

            {/* <button type="button" class="btn btn-primary collection-btn">Shop now</button> */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#6B4028',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '0px',
                '&:hover': {
                  backgroundColor: '#543310',
                },
                fontFamily: 'pureblissPoppinsLight',
                fontSize: '16px',
              }}
              onClick={()=> navigate('/shop')}
            >
              Shop now
            </Button>
          </div>
          <Collectiont isMobile={isMobile}/>
        </div>
      </Container>
    </div>
  );
};

export default Collection;



// import React from 'react'
// import { Box, Typography } from '@mui/material';
// import { Container } from 'react-bootstrap';
// import './Craftsmanship.css';
// import CraftShipt from '../components/CraftShipt';
// import '../pages/style/collection.css';

// const Collection = () => {

//   const collection = [
//     {
//       image: "/main-images/home-img1.png",
//       description: "The Lorem ipsum filling text is used by graphic designers.",
//       price: "Rs.999.00"
//     },
//     {
//       image: "/main-images/home-img2.png",
//       description: "Lorem ipsum dolor sit amet. Ea saepe reprehenderit et exercitationem 40 in 1 pack.",
//       price: "Rs.199.00"
//     },
//   ]


//   return (
//     <div>
//       <Container className="craftsmanship-container" component="div">
//         <Box className="craftsmanship-img">
//           <img loading="lazy" src={`${process.env.PUBLIC_URL}/main-images/craftmanship.png`} alt="craftmanship" className="background-image" />
//         </Box>

//         <div className="collection-Content">
//           <div className="collection-section">
//             <h1 className='collection-head'>OUR COLLECTION</h1>

//             <div className="collection-shop">
//               <div className="collection-image">
//                 <img loading="lazy" src="/main-images/home-img1.png" alt="collection" />
//               </div>
//               <div className="collection-image">
//                 <img loading="lazy" src="/main-images/home-img1.png" alt="collection" />
//               </div>
//               <div className="collection-image">
//                 <img loading="lazy" src="/main-images/home-img1.png" alt="collection" />
//               </div>
//             </div>
//           </div>
//           <CraftShipt />
//         </div>

//       </Container>
//     </div>
//   )
// }

// export default Collection