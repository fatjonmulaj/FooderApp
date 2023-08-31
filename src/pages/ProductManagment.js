    // ProductManagement.js
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    function ProductManagement() {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');

    useEffect(() => {
        // Fetch users from the API
        axios.get('https://localhost:44334/api/perdoruesi') // Replace with your API endpoint
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }, []);

    const handleAddUser = () => {
        // Make a POST request to add a new user
        axios.post('https://localhost:44334/api/perdoruesi', { emriMbiemri: newUserName, roli: 'klient' }) // Replace with your API endpoint and default role
        .then(response => {
            // Refresh the user list after adding a user
            setUsers([...users, response.data]);
            setNewUserName('');
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
    };

    const handleDeleteUser = (userId) => {
        // Make a DELETE request to delete a user
        axios.delete(`https://localhost:44334/api/perdoruesi/${userId}`) // Replace with your API endpoint
        .then(response => {
            // Refresh the user list after deleting a user
            const updatedUsers = users.filter(user => user.perdoruesiID !== userId);
            setUsers(updatedUsers);
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    };

    return (
        <div>
        <h2>User Management</h2>
        <ul>
            {users.map(user => (
            <li key={user.perdoruesiID}>
                {user.emriMbiemri}
                {/* Add button for deleting user */}
                <button onClick={() => handleDeleteUser(user.perdoruesiID)}>Delete</button>
            </li>
            ))}
        </ul>
        <div>
            <input
            type="text"
            value={newUserName}
            onChange={e => setNewUserName(e.target.value)}
            />
            <button onClick={handleAddUser}>Add User</button>
        </div>
        </div>
    );
    }

    export default ProductManagement;
