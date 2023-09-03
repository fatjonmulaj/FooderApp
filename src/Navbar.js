import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';

export default function NavbarApp({ isLoggedIn, userRole, setIsDropdownVisible, isDropdownVisible }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    useEffect(() => {
        
        setLoggedIn(isLoggedIn);
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('kaPerdorues');
        localStorage.removeItem('userRole');
        localStorage.removeItem('perdoruesiId');
        setIsDropdownVisible(false);
        navigate('/Home');
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
                {loggedIn ? ( 
                    <>
                        {userRole === 'Admin' && (
                            <>
                                <li> <CustomLink to='/ProductManagement'>Product Management</CustomLink></li>
                                <li> <CustomLink to='/UserManagement'>User Management</CustomLink></li>
                                <li> <CustomLink to='/OrderManagement'>Order Management</CustomLink></li>
                            </>
                        )}
                        <li> <CustomLink to='/Home' onClick={handleLogout}>Logout</CustomLink></li>
                    </>
                ) : (
                    <Dropdown>
                        <Dropdown.Toggle variant='secondary' id='dropdown-basic' className='bg-dark border-1'>
                            Login Or Register
                        </Dropdown.Toggle>
                        <Dropdown.Menu id='dropdownnav'>
                            <Dropdown.Item >
                                <CustomLink to='/Login' className='text-black '>Login</CustomLink>
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
