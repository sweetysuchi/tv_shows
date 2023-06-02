import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if the email and password are valid
    if (email === 'example@example.com' && password === 'password') {
      // Successful login, navigate to the ShowList page
      setErrorMessage('Please enter valid email and password');

      navigate('/show');
    } else {
      // Invalid credentials, display an error message or perform any necessary actions
      setErrorMessage('Invalid email or password');

      console.log('Invalid email or password');
    }
  };

  return (
    <div className="container">
                <h1>Login Details</h1>

      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button onClick={handleLogin}>Login</button>
      </div>
    
    </div> 
     );
};

export default Login;
