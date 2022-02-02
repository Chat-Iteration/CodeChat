
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Login = props => {
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const token = await loginUser({
  //     username,
  //     password
  //   });
  //   setToken(token);
  // }


  const handleLogin = () => {
    fetch('/oauth/redirect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '',
    });
  };

  return (
    <div className="logincontainer">
      <h1>Please Log In via GitHub Authentication</h1>
      {/* <button onClick={handleLogin}>Login</button> */}
      <button onClick={props.handleClick}>Login</button>
    </div>
  );
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };

export default Login;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';




// export default Login
