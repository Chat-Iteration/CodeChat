// server side 

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

// const CLIENT_ID = '9a43b070d8872c1b9113';
// const CLIENT_SECRET = 'eacd2fccc7e93c286def62827c0438d40c1d8ac5';
//authorization callback URL = http://localhost:8080/oauth2callback

// const GITHUB_URL = 'https://github.com/login/oauth/authorize';
// https://github.com/login/oauth/authorize
//authorization callback URL = http://localhost:8080/oauth2callback
const app = express();
app.use(cors({credentials: true, origin: true}));


app.get('/oauth/redirect',(req,res)=>{
    axios.post({
        method: 'POST',
        url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret${CLIENT_SECRET}&code=${req.query.code}`,
        headers: {
            Accept: 'application/json'
        }
    })
    .then(response =>{
        res.redirect(`http://localhost:3000?access_token= ${response.data.access.token}`)
    })
})


// client side 

// function Login = () => {

// }