import React, { useState } from 'react'
import { auth } from '../firebase/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                console.log(value);
                setEmail('');
                setPassword('');
                alert("User logged-in successfully");
                navigate('/');

            })
            .catch((error) => alert(error.message));
    }

    return (
        <div className='auth auth-login'>
            <div className='auth-container'>
                <h1>Login</h1>
                <form onSubmit={loginUser} className="auth-form">
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
                    <button type="submit" className='auth-button-submit'>Sign In</button>
                    <p className="auth-p">Don't have an account? <span className="auth-span" onClick={() => navigate("/signup")}>Sign Up</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login