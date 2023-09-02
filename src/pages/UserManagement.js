import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        emriMbiemri: '',
        email: '',
        fjalekalimi: '',
        adresa: '',
        roli: '',
    });
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('https://localhost:44334/api/perdoruesi')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    };

    const handleCreateUser = () => {
        axios.post('https://localhost:44334/api/perdoruesi', newUser)
        .then(response => {
            console.log('User created successfully:', response.data);
            // Clear the form
            setNewUser({
            emriMbiemri: '',
            email: '',
            fjalekalimi: '',
            adresa: '',
            roli: '',
            });
            // Refresh the user list by fetching all users again
            fetchUsers();
        })
        .catch(error => {
            console.error('Error creating user:', error);
        });
    };

    const handleEditUser = (user) => {
        axios.put(`https://localhost:44334/api/perdoruesi/${user.perdoruesiID}`, user)
        .then(response => {
            console.log('User updated successfully:', response.data);
            // Clear the editingUser state and refresh the user list
            setEditingUser(null);
            fetchUsers();
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
    };

    const handleDeleteUser = (userID) => {
        axios.delete(`https://localhost:44334/api/perdoruesi/${userID}`)
        .then(response => {
            console.log('User deleted successfully:', response.data);
            // Refresh the user list after deleting the user
            fetchUsers();
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    };


    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    const startEditingUser = (user) => {
        setEditingUser(user);
    };

    return (
        <div id='usermanagement' className='text-light'>
        <h2>User Management</h2>
        <div>
            <h3>Create New User:</h3>
            <input className='my-3' type='text' name='emriMbiemri' placeholder='Name' value={newUser.emriMbiemri} onChange={(e) => setNewUser({ ...newUser, emriMbiemri: e.target.value })}/>
            <input type='text' name='email' placeholder='Email' value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}/>
            <input type='password' name='fjalekalimi' placeholder='Password' value={newUser.fjalekalimi} onChange={(e) => setNewUser({ ...newUser, fjalekalimi: e.target.value })}/>
            <input type='text' name='adresa' placeholder='Address' value={newUser.adresa} onChange={(e) => setNewUser({ ...newUser, adresa: e.target.value })}/>
            <input type='text' name='roli' placeholder='Role' value={newUser.roli} onChange={(e) => setNewUser({ ...newUser, roli: e.target.value })}/>
            <button onClick={handleCreateUser}>Create User</button>
        </div>
        <ul>
            {users.map(user => (
            <li key={user.perdoruesiID}>
                {editingUser === user ? (
                <div>
                    <input type='text' name='emriMbiemri' value={user.emriMbiemri} onChange={(e) => user.emriMbiemri = e.target.value}/>
                    <input type='text' name='email' value={user.email} onChange={(e) => user.email = e.target.value}/>
                    <input type='password' name='fjalekalimi' value={user.fjalekalimi} onChange={(e) => user.fjalekalimi = e.target.value}/>
                    <input type='text' name='adresa' value={user.adresa} onChange={(e) => user.adresa = e.target.value}/>
                    <input type='text'name='roli' value={user.roli} onChange={(e) => user.roli = e.target.value}/>
                    <button onClick={() => handleEditUser(user)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
                ) : (
                <div>
                    <p>Name: {user.emriMbiemri}</p>
                    <p>Email: {user.email}</p>
                    <p>Password: {user.fjalekalimi}</p>
                    <p>Address: {user.adresa}</p>
                    <p>Role: {user.roli}</p>
                    <button onClick={() => startEditingUser(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.perdoruesiID)}>Delete</button>
                </div>
                )}
            </li>
            ))}
        </ul>
        </div>
    );
    }

export default UserManagement;
