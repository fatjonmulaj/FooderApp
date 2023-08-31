    // AdminPage.js
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import ProductManagement from './Users/ProductManagment'; // Import the ProductManagement component

    function AdminPage() {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Get user role from local storage or context
        const role = localStorage.getItem('userRole'); // Replace with your logic
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
