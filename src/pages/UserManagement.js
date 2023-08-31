    // Example UserManagementComponent.js
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    function UserManagementComponent() {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');

    useEffect(() => {
        // Fetch users from the API
        axios.get('https://localhost:44334/api/perdoruesi')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }, []);

    const handleAddUser = () => {
        // Make a POST request to add a new user
        axios.post('https://localhost:44334/api/perdoruesi', { emriMbiemri: newUserName })
        .then(response => {
            // Refresh the user list after adding a user
            setUsers([...users, response.data]);
        })
        .catch(error => {
            console.error('Error adding user:', error);
        });
    };

    // Similar handlers for updating and deleting users

    return (
        <div>
        <h2>User Management</h2>
        <ul>
            {users.map(user => (
            <li key={user.perdoruesiID}>
                {user.emriMbiemri}
                {/* Add buttons for updating and deleting */}
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

    export default UserManagementComponent;
