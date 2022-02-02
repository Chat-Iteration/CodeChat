const express = require('express');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const chatController = require('../controllers/chatController');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
// login page
    // some kind of OAuth functionality
    router.get('/auth',(req,res)=>{
        // axios post method that will redirect our user to the github authorization page
        // then respond with a access token back from github 
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`)
    })

    router.get('/oauth2callback',({query:{code}},res)=>{
        const body = {
            client_id : process.env.CLIENT_ID,
            client_secret : process.env.CLIENT_SECRET,
            code,
        };
        const options = {headers: {accept: 'application/json'}};
        axios
            .post('https://github.com/login/oauth/access_token' , body, options)
            .then(_res => _res.data.access_token)
            .then(token=>{
                console.log('token', token)
                res.redirect()
            })
            .catch(err=>{
                _res.sendStatus(500);
            })
    })

// home page
 // getting list of all the existing chatrooms
//  homeController.getFavorites,
 // section with favorited chatrooms
router.get('/home',
    homeController.getChatrooms,
    (req, res) => res.status(200).json(res.locals.chatrooms)
)

// // create new chatroom button
//     // post request to server with form data from front end
router.post('/newChat',
    homeController.newChat,
    (req, res) => res.status(200).json('[]')
)
    
// // access chatroom 
router.get('/chatroom',
    homeController.loadChat,
    (req, res) => res.status(200).json('foo')
)

// post message
// router.post('/postMsg,
//      chat.Controller.postMsg,
//      (req, res) => res.status(200).json(foo)
// )

   
 // sign out button
// router.get('/logout',
//     homeController.logOut,
//     (req, res) => res.status(200).json(foo) 
// )

// // go back to home page
// router.get('/loadHome', 
//     chatController.loadHome,
//     (req, res) => res.status(200).json(foo)
// )

// // add to favorites
// router.get('/addFavorites',
//     chatController.addFavorites,
//     (req, res) => res.status(200).json(foo)
// )

// implement emoji/gif and youtube api's here
    

module.exports = router;