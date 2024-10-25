// // src/app/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import productsReducer from '../features/products/productsSlice';
// import cartReducer from '../features/cart/cartSlice';
// import userReducer from '../features/user/userSlice';

// export const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     cart: cartReducer,
//     user: userReducer,
//   },
// });

// export default store;

//Good code.
// client/src/app/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducer'; // Import your root reducer

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

// client/src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;

// // client/src/app/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducer'; // Import your root reducer

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;
