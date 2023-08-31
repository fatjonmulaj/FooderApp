// import React, { useState } from 'react';
// import axios from 'axios';

// function Signup() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSignup = (e) => {
//         e.preventDefault();

//         const newUser = {
//             emriMbiemri: username,
//             email: email,
//             fjalekalimi: password,
//         };

//         axios.post('https://localhost:44334/api/Registration/registration', newUser)
//             .then(response => {
//                 console.log('User registered successfully:', response.data);
//                 // Redirect or perform other actions on successful registration
//             })
//             .catch(error => {
//                 console.error('Error registering user:', error);
//             });
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center my-5 '>
//             <div className='bg-white p-3 rounded w-50'>
//                 <h3 className='mb-4'>Fooder <i className="fa-solid fa-pizza-slice"></i></h3>
//                 <h4 className='mb-3'>Create your account:</h4>
//                 <form onSubmit={handleSignup}>
//                     <div className='mb-3'>
//                         <label htmlFor='text' className='mb-1'><strong>Username</strong></label>
//                         <input
//                             type='text'
//                             placeholder='Enter your username'
//                             className='form-control rounded-0'
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='Email' className='mb-1'><strong>Email</strong></label>
//                         <input
//                             type='email'
//                             placeholder='Enter your email'
//                             className='form-control rounded-0'
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='Password' className='mb-1'><strong>Password</strong></label>
//                         <input
//                             type='password'
//                             placeholder='Enter your Password'
//                             className='form-control rounded-0'
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button type='submit' className='btn btn-success w-100 my-3'><strong>Sign Up</strong></button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Signup;



