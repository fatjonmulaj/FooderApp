// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Login() {
//     const [perdoruesi, setPerdoruesi] = useState([]);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     useEffect(() => {
//         axios.get('https://localhost:44334/api/perdoruesi')
//             .then(response => {
//                 setPerdoruesi(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     const handleLogin = () => {
//         // Find the user with the provided email in the fetched data
//         const user = perdoruesi.find(user => user.email === email);

//         if (user && user.fjalekalimi === password) {
//             alert('Login successful');
//             localStorage.setItem('kaPerdorues','true');
//             localStorage.setItem('perdoruesiId',user.perdoruesiID);
//         } else {
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center bg-body-secondary vh-100'>
//             <div className='bg-white p-3 rounded w-25'>
//                 <h3 className='mb-4'>Fooder <i className="fa-solid fa-pizza-slice"></i></h3>
//                 <div className='mb-3'>
//                     <label htmlFor='Email'><strong>Email</strong></label>
//                     <input
//                         type='email'
//                         placeholder='Enter your email'
//                         className='form-control rounded-0'
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div className='mb-3'>
//                     <label htmlFor='Password'><strong>Password</strong></label>
//                     <input
//                         type='password'
//                         placeholder='Enter your Password'
//                         className='form-control rounded-0'
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button className='btn btn-success w-100 mb-3' onClick={handleLogin}><strong>Log in</strong></button>
//                 <p>Dont Have an Account? Create One <i className="fa-solid fa-arrow-down-long text-black"></i></p>
//                 <button className='btn btn-default border  w-100 '>Create Account</button>
//             </div>
//         </div>
//     )
// }

// export default Login;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [perdoruesi, setPerdoruesi] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:44334/api/perdoruesi')
            .then(response => {
                setPerdoruesi(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLogin = () => {
        const user = perdoruesi.find(user => user.email === email);
    
        if (user && user.fjalekalimi === password) {
            alert('Login successful');
            localStorage.setItem('kaPerdorues', 'true');
            localStorage.setItem('perdoruesiId', user.perdoruesiID);
            localStorage.setItem('userRole', user.roli); // Set user role in localStorage
            navigate('/Home'); // Navigate after successful login
        } else {
            alert('Invalid credentials');
        }
    };
    

    return (
        <div className='d-flex justify-content-center align-items-center my-5 w-100'>
            <div className='bg-white p-3 rounded w-50 '>
                <h3 className='mb-4'>Fooder <i className="fa-solid fa-pizza-slice"></i></h3>
                <div className='mb-3'>
                    <label htmlFor='Email'><strong>Email</strong></label>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        className='form-control rounded-0'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Password'><strong>Password</strong></label>
                    <input
                        type='password'
                        placeholder='Enter your Password'
                        className='form-control rounded-0'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className='btn btn-success w-100 mb-3' onClick={handleLogin}><strong>Log in</strong></button>
                <p>Dont Have an Account? Create One <i className="fa-solid fa-arrow-down-long text-black"></i></p>
                <button className='btn btn-default border w-100'>
                    <Link to='/Signup'>Create Account</Link>
                </button>
            </div>
        </div>
    );
}

export default Login;

