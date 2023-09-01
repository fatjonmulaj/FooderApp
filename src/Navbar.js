// import React from 'react';
// import {Link, useMatch, useResolvedPath,NavLink} from 'react-router-dom';
// import { Button, Container, Dropdown, Nav, Navbar as NavbarBs } from "react-bootstrap";

// // import { useShoppingCart } from "../context/ShoppingCartContext"

// const kaPerdorues = localStorage.getItem('kaPerdorues');

// export default function NavbarApp() {
//   return (
//     <nav className='nav d-flex bg-dark w-100' sticky="top">
//         <div>
//             <p><Link to='/Home' className='title text-danger'>Fooder</Link></p>
//         </div>
//         <ul>
//             <li> <CustomLink to='/Home'>Home</CustomLink></li>
//             <li> <CustomLink to='/Products'>Products</CustomLink></li>
//             <li> <CustomLink to='/Cart'>Cart</CustomLink></li>
//             <li> <CustomLink to='/Contact'>Contact Us</CustomLink></li>
//             {kaPerdorues && <li> <CustomLink to='/Logout'>Logout</CustomLink></li>}
//             <Dropdown>
//               <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='bg-dark border-1'>
//                 Login Or Register
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item className=''>
//                   <CustomLink to='/Login' className='text-black'>Login</CustomLink>
//                 </Dropdown.Item>
//                 <Dropdown.Item >
//                   <CustomLink to='/Signup' className='text-black '>Signup</CustomLink>
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
            
//         </ul>
//         <Button
//             // onClick={openCart}
//             style={{ width: "3rem", height: "3rem", position: "relative"}}
//             variant="outline-primary"
//             className="rounded-circle"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 576 512"
//               fill="currentColor"
//               className='text-light'
//             >
//               <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
//             </svg>

//             <div
//               className="rounded-circle bg-primary text-black d-flex justify-content-center align-items-center"
//               style={{
//                 color: "white",
//                 width: "1.5rem",
//                 height: "1.5rem",
//                 position: "absolute",
//                 bottom: 0,
//                 right: 0,
//                 transform: "translate(25%, 25%)",
//               }}
//             >
//               {/* {cartQuantity} */}
//             </div>
//           </Button>
//     </nav>
//   )
// }

// function CustomLink({ to , children, ...props}){
//   const resolvedPath = useResolvedPath(to)
//   const isActive = useMatch({path:resolvedPath.pathname, end:true})

//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//         </Link>
//     </li>
//   );
// }


// Navbar.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';

export default function NavbarApp({ isLoggedIn, userRole, setIsDropdownVisible, isDropdownVisible }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('kaPerdorues');
        localStorage.removeItem('userRole');
        localStorage.removeItem('perdoruesiId');
        setIsDropdownVisible(false);
        navigate('/Home.html');
    };

    return (
        <nav className='nav d-flex bg-dark w-100' sticky='top'>
            <div>
                <p>
                    <Link to='/Home' className='title text-danger'>
                        Fooder
                    </Link>
                </p>
            </div>
            <ul>
                <li> <CustomLink to='/Home'>Home</CustomLink></li>
                <li> <CustomLink to='/Products'>Products</CustomLink></li>
                <li> <CustomLink to='/Cart'>Cart</CustomLink></li>
                <li> <CustomLink to='/Contact'>Contact Us</CustomLink></li>
                {isLoggedIn ? (
                    <>
                        {userRole === 'Admin' && (
                            <li> <CustomLink to='/ProductManagement'>Product Management</CustomLink></li>
                        )}
                        <li> <CustomLink to='/Logout' onClick={handleLogout}>Logout</CustomLink></li>
                    </>
                ) : (
                    <Dropdown>
                        <Dropdown.Toggle variant='secondary' id='dropdown-basic' className='bg-dark border-1'>
                            Login Or Register
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className=''>
                                <CustomLink to='/Login' className='text-black'>Login</CustomLink>
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <CustomLink to='/Signup' className='text-black '>Signup</CustomLink>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </ul>
            
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}




// {/* <Button
//                 style={{ width: "3rem", height: "3rem", position: "relative" }}
//                 variant="outline-primary"
//                 className="rounded-circle">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className='text-light'>{/* ... path data ... */}
//                 </svg>
//                 <div className="rounded-circle bg-primary text-black d-flex justify-content-center align-items-center" style={{
//                         color: "white",width: "1.5rem",height: "1.5rem",position: "absolute",bottom: 0,right: 0,transform: "translate(25%, 25%)",}}>
//                     {/* {cartQuantity} */}
//                 </div>
//             </Button> */}