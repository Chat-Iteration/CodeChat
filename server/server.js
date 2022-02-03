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

app.get('/oauth2callback', async (req, res) => {
  console.log('oauth 2 hit', req.query.code);
  // // const body = {
  // //   client_id : process.env.CLIENT_ID, 
  // //   client_secret : process.env.CLIENT_SECRET,
  // //   code: req.query.code,
  // // };
  // console.log(body);
  // const options = {headers: {accept: 'application/json'}};
  const url = `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`
  try {
    const response = await axios.post(url, {headers: {'Content-Type': 'application/json'} } );
    const token = response.data
    console.log('token', token);
    // access_token = token;
    // res.redirect('www.google.com');
    // res.locals.token = token;
    // res.status(200).send(token);
    res.redirect(`http://localhost:8080/home?${token}`);
  } catch (err) {
    console.log(err);
    return next(err);
  }
  // axios
  //   .post(`https://github.com/login/oauth/access_token` , body, options)
  //   .then((_res) => _res.data.access_token)
  //   .then((token)=>{
  //     console.log('token', token);
  //     access_token = token;
  //     res.redirect(`/?token=${token}`);
  //   })
  //   // .catch(err => res.status(406).json({'test': 'err'}))
  //   .catch((err) => {
  //     console.log('axios catch err');
  //     res.status(500).json(console.log({ err: err.message })) 
  //   })

})
// app.get('/oauth2callback', ({query:{code}}, res)=>{

//     console.log('in /oauth2callback route', req);
//     const body = {
//       client_id : process.env.CLIENT_ID,
//       client_secret : process.env.CLIENT_SECRET,
//       code,
//     };
//     const options = {headers: {accept: 'application/json'}};
//     axios
//     .post(`https://github.com/login/oauth/access_token` , body, options)
//     .then((_res) => _res.data.access_token)
//     .then((token)=>{
//       console.log('token', token);
//       res.redirect(`/?token=${token}`);
//     })
//     // .catch(err => res.status(406).json({'test': 'err'}))
//     .catch((err) => res.status(500).json(console.log({ err: err.message })))

// })

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
  // when the user enters the room

  socket.on('join', ({ name, room }) => {
    const { user } = addUser({ name, room });

    // socket.join(user.room);
    // socket.to(user.room).emit('message', { user: 'admin', message: `${user.name}, welcome to room ${user.room}!` });
    // socket.broadcast.emit('message', { user: 'admin', message: `${user.nme} has joined the room!` });
    // io.to(user.room).emit('roomInfo', { room: user.room, users: getUsers(users.room) });
  });

  // when the user send a message
  socket.on('sendMessage', ({ name, message }) => {
    // console.log(name);
    // console.log(message);
    // const user = getUser(name);
    io.emit('ping', {name, message});
    io.emit('message', {name, message});
    // io.to(user.room).emit('message', { user: user.name, message: message });
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