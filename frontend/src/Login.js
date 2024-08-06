import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'; // Ensure you have corresponding styles in index.css
import axios from 'axios';

function Login() {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error message

  // Function to handle form submission
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Make a POST request to the backend login endpoint
      const response = await axios.post('http://localhost:5000/login', { email, password });

      // If login is successful, navigate to the dashboard
      if (response.data.message === 'Login successful') {
        navigate('/dashboard');
      }
    } catch (error) {
      // Set error message if login fails
      setError(error.response?.data?.error || 'Error logging in');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <Link to="/signup" className="auth-link">Sign Up</Link>
    </div>
  );
}

export default Login;

// export default Login;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './index.css'; // Ensure you have corresponding styles in index.css
// import axios from 'axios';

// function Login() {
//   const navigate = useNavigate(); // Hook for navigation
//   const [email, setEmail] = useState(''); // State for email input
//   const [password, setPassword] = useState(''); // State for password input
//   const [error, setError] = useState(''); // State for error message

//   // Function to handle form submission
//   const handleLogin = async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior

//     try {
//       // Make a POST request to the backend login endpoint
//       const response = await axios.post('http://localhost:8081/login', { email, password });

//       // If login is successful, navigate to the dashboard
//       if (response.data.message === 'Login successful') {
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       // Set error message if login fails
//       setError(error.response?.data?.error || 'Error logging in');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h1>Login</h1>
//       <form onSubmit={handleLogin} className="auth-form">
//         <div className="input-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="auth-input"
//           />
//         </div>
//         <div className="input-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="auth-input"
//           />
//         </div>
//         <button type="submit" className="auth-button">Login</button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//       <Link to="/signup" className="auth-link">Sign Up</Link>
//     </div>
//   );
// }

// export default Login;
