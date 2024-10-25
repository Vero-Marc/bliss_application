import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material/styles';

// Sidebar,NavBar,Footer,ScrollToTop
import ScrollToTop from './Scroll';
import Sidebar from './app/Admin/AdminNavbar';
import NavBar from './app/components/NavBar';
import Footer from './app/components/Footer';

// admin 
import AdminHome from './app/Admin/AdminHome'
import Dashboard from './app/Admin/AdminDashboard';
import ProductUpload from './app/Admin/ProductManagement/AddProduct';
import OrderList from './app/Admin/OrderManagement/OrderList';
import EditProduct from './app/Admin/ProductManagement/EditProduct';
import ProductList from './app/Admin/ProductManagement/ProductList';

// Home admin
import UserProfile from './app/features/user/UserProfile';
import OrderDetails from './app/features/orders/Orders';
import OrderCheckout from './app/features/orders/OrderCheckout';

// Home
import Home from './app/pages/Home';
import Shop from './app/pages/Shop';
import Craftsmanship from './app/pages/Craftsmanship';
import Collection from './app/pages/Collection';
import Contact from './app/pages/Contact';
import Login from './app/pages/Login';
import Signup from './app/features/user/Signup';
import ProductView from './app/features/products/ProductView';
import Cart from './app/features/cart/Cart';

import { AuthProvider, useAuth } from './app/services/AuthContext'; 

import theme from './Theme';
import OrderSummary from './app/features/orders/OrderSummary';
import Terms from './app/components/ConsumerPolicy/Terms';
import PrivacyPolicy from './app/components/ConsumerPolicy/PrivacyPolicy';
import Returns from './app/components/ConsumerPolicy/Returns';
import PasswordReset from './app/features/user/PasswordReset';
import ChangePassword from './app/features/user/ChangePassword';
import ShippingPolicy from './app/components/ConsumerPolicy/ShippingPolicy';
function App() {

  const clientId = "407984448539-dmtf3l80ikef44lbu10f3470n90rk4fp.apps.googleusercontent.com"  

  return (
    <Router>
        <GoogleOAuthProvider clientId={clientId}>
            <ThemeProvider theme={theme}>
              <AuthProvider>
                <Main />
              </AuthProvider>
            </ThemeProvider>
        </GoogleOAuthProvider>
    </Router>
  );
}

const Main = () => {
  const { role } = useAuth(); // Correctly use useAuth to get role
  
  return (
    <>
      <ScrollToTop />
      {role === 'admin' ? (
        <>
          <Sidebar />
            <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="adm/dashboard" element={<Dashboard/>} />
                <Route path="adm/productlist" element={<ProductList/>} />
                <Route path="adm/productupload" element={<ProductUpload />} />
                <Route path="adm/orderlist" element={<OrderList />} />
                <Route path="adm/editproduct/:productId" element={<EditProduct />} />
            </Routes>
        </>
      ) : (
        <>
         <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/craftsmanship" element={<Craftsmanship />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/productview/:productId" element={<ProductView />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/userprofile" element={<UserProfile/>} />
                <Route path="/admhome" element={<AdminHome />} />
                <Route path="/admhome/dashboard" element={<Dashboard/>} />
                <Route path="/admhome/productsupload" element={<ProductUpload />} />
                <Route path="/orders" element={<OrderDetails />} />
                <Route path="/checkout" element={<OrderCheckout />} />
                <Route path="/ordersummary/:orderId" element={<OrderSummary/>}/>
                <Route path="/terms" element={<Terms/>}/>
                <Route path="/privacy" element={<PrivacyPolicy/>}/>
                <Route path="/returns" element={<Returns/>}/>
                <Route path="/shipping_policy" element={<ShippingPolicy/>}/>
                <Route path="/password-reset" element={<PasswordReset/>}/>
                <Route path="/change-password/:userId" element={<ChangePassword/>}/>
            </Routes>
         <Footer />
        </>
      )}
    </>
  );
};

export default App;
