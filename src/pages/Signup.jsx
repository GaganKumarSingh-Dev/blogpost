import React, { useState } from 'react'
import { auth } from '../firebase/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createUser = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((value) => {
            console.log(value);
            setEmail('');
            setPassword('');
            alert("User created successfully");
            navigate('/login');
        })
        .catch((error) => alert(error.message));
    }

    return (
        <div className='signup'>
            <h1>Signup</h1>
            <form onSubmit={createUser}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} placeholder='Enter your e-mail' onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"  value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup