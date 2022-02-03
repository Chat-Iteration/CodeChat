
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

//  function handleLogin () {
//   fetch('http://localhost:3000/auth')
//   // .then(res => console.log(res))
//   // .catch(err => console.log(err));
// }
  const Login = props => {
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const token = await loginUser({
  //     username,
  //     password
  //   });
  //   setToken(token);
  // }

  //   const handleLogin = () => {
  //   fetch('http://localhost:3000/auth',{
  //     mode: 'no-cors',
  //     header:{
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': 'Content-Type'
  //     }
  //   })
  //   .then(res => console.log('working',res))
  //   .catch(err => console.log('error', err));
  // };

  // const handleLogin = () => {
  //   fetch('/server/auth')
  //   .then(res => console.log('working',res))
  // };

  return (
    <div className="logincontainer">
      <h1>Please Log In via GitHub Authentication</h1>
      <button onClick={() => window.location.replace('http://localhost:3000/server/auth')}>Login</button>
    </div>
  );
}

// Login.propTypes = {
  //   setToken: PropTypes.func.isRequired
  // };
  
  
  
  
  
  export default Login;
  /* <button onClick={handleLogin}>Login</button> */
