// import React, { useEffect,useState } from 'react';
// import './styles.css';
// import NavbarApp from './Navbar';
// import Products from './pages/Products';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Contact from './pages/Contact';
// import Home from './pages/Home';
// import { Route, Routes} from 'react-router-dom';
// import AdminPage from './AdminPage';


// function App() {

//   const [cart, setCart] = useState([]);

//   // Define the addToCart function here
//   const addToCart = (product) => {
//     setCart([...cart, product])
//   };

//   return(
//     <>
//     <NavbarApp />
//     <div className='container'>
//       <Routes>
//         <Route path='/Home' element={<Home />} />
//         <Route path='/Products' element={<Products cart={cart} addToCart={addToCart} />} />
//         <Route path='/Contact' element={<Contact />} />
//         <Route path='/Login' element={<Login />} />
//         <Route path='/Signup' element={<Signup />} />
//       </Routes>
//     </div>
//     </>
//   )
// }


// export default App;


import React, { useEffect, useState } from 'react';
import './styles.css';
import NavbarApp from './Navbar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import { Route, Routes } from 'react-router-dom';


function App() {
  const [cart, setCart] = useState([]);
  const [userRole, setUserRole] = useState('');

  // Define the addToCart function here
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    // Get user role from local storage or context
    const role = localStorage.getItem('userRole'); // Replace with your logic
    setUserRole(role);
  }, []);

  return (
    <>
      <NavbarApp />
      <div className='container'>
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/Products' element={<Products cart={cart} addToCart={addToCart} />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          {/* Use role-based routing */}
          {userRole === 'admin' && <Route path='/AdminPage' element={<AdminPage />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;

