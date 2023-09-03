    // AdminPage.js
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import ProductManagement from './Users/ProductManagment'; 

    function AdminPage() {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('userRole'); 
        setUserRole(role);
    }, []);

    return (
        <div>
        <h1>Admin Page</h1>
        {userRole === 'Admin' ? (
            <ProductManagement />
        ) : (
            <p>You do not have permission to access this page.</p>
        )}
        </div>
    );
    }

    export default AdminPage;
