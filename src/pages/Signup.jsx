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
        <div className='auth auth-signup'>
            <div className='auth-container'>
                <h1>Signup</h1>
                <form onSubmit={createUser} className="auth-form">
                    <div className="auth-flex-column">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="auth-inputForm">
                        <input type="email" id="email" name="email" value={email} placeholder='Enter your e-mail' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="auth-flex-column">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="auth-inputForm">
                        <input type="password" id="password" name="password" value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className='auth-button-submit'>Signup</button>
                    <p className="auth-p">Already have an account? <span className="auth-span" onClick={() => navigate("/login")}>Sign In</span></p>
                </form>
            </div>
        </div>
    )
}

export default Signup