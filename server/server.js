const http = require('http');
const path = require('path');
const express = require('express');
const PORT = 3000;
const cors = require('cors');
require('dotenv').config();
// const socketio = require('socket.io');
const { Server, Socket } = require('socket.io');
const { addUser, removeUser, getUser, getUsers } = require('./userFunctions');
const axios = require('axios');
// express server
// -> create httpserver with express server
// --> create socket io server
// httpserver socket io
// listen on port 3000
const routerPage = require('./Routers/routers')
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let access_token;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/server', routerPage)

app.get('/oauth2callback', async (req, res, next) => {
  console.log('oauth 2 hit', req.query.code);
  const url = `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`
  try {
    const response = await axios.post(url, {headers: {'Content-Type': 'application/json'} } );
    const token = response.data
    // console.log('token', token); //  access_token=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&scope=&token_type=bearer
                                  //              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
    const parsedToken = token.split('=')[1].split('&')[0];
    // console.log('Secret', process.env.CLIENT_SECRET);
    // access_token = token;
    const userName = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization' : `token ${parsedToken}`
      }
    }) //pass in token
    console.log(userName.data.login);
    // res.redirect('www.google.com');
    // res.locals.token = token;
    // res.status(200).send(token);
    res.redirect(`http://localhost:8080/?${token}?name=${userName.data.login}`);
  } catch (err) {
    console.log(err);
    return next(err);
  }
})


// router error 
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// express error handler 
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: {err: 'An error has occurred!'}
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
})

// listen to server
// app.listen(PORT, () => {
//     console.log(`Server listening on port: ${PORT}...`);
// });


// -------------------------------------------------------------------------
// const io = socketio(server, {
//     origin: '*',
// });


io.on('connection', socket => {
  console.log('IO connected')

  socket.on('join', room => {
    socket.join(room);
    console.log('joined: ', room);
  })
  
  // when the user send a message
  socket.on('sendMessage', ({info, name, message }) => {
    // console.log(name);
    console.log({info, name, message});
    io.to(info).emit('message', {name, message});

  });

  // when the user leave the room
  socket.on('disconnect', name => {
    // const user = removeUser(name);
    // io.to(user.room).emit('message', { user: 'admin', message: `${user.name} has left the room` });
    // io.to(user.room).emit('roomInfo', { room: user.room, users: getUsers(user.room)});
  });
});
// export for testing 
module.exports = server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
})
// server.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}...`);
// });


// -------------------------------------------------------------------------