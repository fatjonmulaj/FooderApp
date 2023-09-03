import React, { useEffect, useState } from 'react';
import './styles.css';
import NavbarApp from './Navbar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProductManagement from './pages/ProductManagment';
import UserManagement from './pages/UserManagement';
import OrderManagement from './pages/OrderManagement';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);


  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter(item => item.produktiID !== product.produktiID);
    setCart(updatedCart);
  };

  const checkout = () => {
    // Implement checkout logic here (e.g., sending an order to the server)
    alert('Checkout completed!');
    setCart([]);
  };


  useEffect(() => {
    // Marrja e rolit nga localstorage
    const role = localStorage.getItem('userRole'); 
    setUserRole(role);

    // Kontrolli nese ka user
    const kaPerdorues = localStorage.getItem('kaPerdorues');
    setIsDropdownVisible(kaPerdorues === 'true');
  }, []);

  return (
    <>
      <NavbarApp isLoggedIn={isDropdownVisible} userRole={userRole} setIsDropdownVisible={setIsDropdownVisible} />
      <div className='container'>
        <Routes>
        <Route path='/' element={<Home />} /> 
          <Route path='/Home' element={<Home />} /> 
          <Route path='/Products' element={<Products cart={cart} addToCart={addToCart} userRole={userRole} />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Cart' element={<Cart />} cart={cart} removeFromCart={removeFromCart} checkout={checkout}  />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          {userRole === 'Admin' && <Route path='/ProductManagement' element={<ProductManagement />} />}
          {userRole === 'Admin' && <Route path='/UserManagement' element={<UserManagement />} />}
          {userRole === 'Admin' && <Route path='/OrderManagement' element={<OrderManagement />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
