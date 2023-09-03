import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
    const [emriMbiemri, setEmriMbiemri] = useState('');
    const [email, setEmail] = useState('');
    const [fjalekalimi, setFjalekalimi] = useState('');
    const [adresa, setAdresa] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false); 

    const handleSignup = () => {
        const newUser = {
        emriMbiemri,
        email,
        fjalekalimi,
        adresa,
        roli: 'klient', 
        };

        axios.post('https://localhost:44334/api/perdoruesi', newUser)
        .then(response => {
            console.log('Signup successful:', response.data);
            setSignupSuccess(true); 
        })
        .catch(error => {
            console.error('Error signing up:', error);
        });
    };

    return (
        <div className='d-flex justify-content-center align-items-center my-5 w-100'>
        <div className='bg-white p-3 rounded w-50'>
            {signupSuccess ? (
            <>
                <h3 className='mb-4 text-dark text-center' style={{ color: 'black',fontWeight:'bold' }}>Your account was successfully created!</h3>
                <button
                    className='btn border bg-dark w-100 mb-3 ' style={{textDecoration: 'none',}}>
                    <Link to='/Login' style={{ textDecoration: 'none', color: 'white',fontWeight:'bold' }}>Login Now</Link>
                </button>
            </>

            ) : (
            <>
                <h3 className='mb-4'>Signup for Fooder <i className="fa-solid fa-pizza-slice"></i></h3>
                <div className='mb-3'>
                <label htmlFor='emriMbiemri'><strong>Name</strong></label>
                <input
                    type='text'
                    placeholder='Enter your name'
                    className='form-control rounded-0'
                    value={emriMbiemri}
                    onChange={e => setEmriMbiemri(e.target.value)}
                />
                </div>
                <div className='mb-3'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input
                    type='email'
                    placeholder='Enter your email'
                    className='form-control rounded-0'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </div>
                <div className='mb-3'>
                <label htmlFor='fjalekalimi'><strong>Password</strong></label>
                <input
                    type='password'
                    placeholder='Enter your password'
                    className='form-control rounded-0'
                    value={fjalekalimi}
                    onChange={e => setFjalekalimi(e.target.value)}
                />
                </div>
                <div className='mb-3'>
                <label htmlFor='adresa'><strong>Address</strong></label>
                <input
                    type='text'
                    placeholder='Enter your address'
                    className='form-control rounded-0'
                    value={adresa}
                    onChange={e => setAdresa(e.target.value)}
                />
                </div>
                <button className='btn btn-success w-100 mb-3' onClick={handleSignup}><strong>Sign up</strong></button>
                <p>Already have an account? Login <i className="fa-solid fa-arrow-down-long text-black"></i></p>
                <button className='btn btn-default border w-100'>
                <Link to='/Login'>Login</Link>
                </button>
            </>
            )}
        </div>
        </div>
    );
    }

export default Signup;
