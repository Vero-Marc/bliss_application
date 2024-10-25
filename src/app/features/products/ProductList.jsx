// // client/src/features/products/ProductList.js
// import React from 'react';

// const ProductList = ({ products }) => {
//   return (
//     <div>
//       {products.map(product => (
//         <div key={product.id}>
//           <h2>{product.name}</h2>
//           <p>{product.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;

// src/features/products/ProductList.jsx
import React, { useState } from 'react';
import Product from './ProductPage';
import './products.css';

const ProductList = () => {
  // const products = useSelector((state) => state.products.items);
  const [products,setProducts] = useState([])
  
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <Product
          key={index}
          image={product.image}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
