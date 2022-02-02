const db = require('../messageBoardModel')
const homeController = {};


homeController.getChatrooms = (req, res, next) => {
    const sqlQuery = ` 
    SELECT * 
    FROM chatrooms; 
    `;

    db.query(sqlQuery)
      .then((data) => {
        // console.log(data);
        res.locals.chatrooms = data.rows;
        return next();
      })
      .catch((err) => {
        console.log('error in getChatrooms middleware')
        return next(err)
      })

}

homeController.newChat = (req, res, next) => {
    console.log(req.body)
    // const chat = req.body
    // const sqlQuery = `\
    // CREATE TABLE ${chat.title}_chatroom (users varchar(255), message varchar(1000));
    // `;
    const { title, status, password } = req.body;
    const params = [ title, status, password ];
    const sqlQuery = 'INSERT INTO chatrooms (title, status, password) VALUES ($1,$2,$3)';

    db.query(sqlQuery, params)
        .then((data) => {
            return next();
        })
        .catch(err => next({
            log: `homeController.newChat: ERROR: ${err}`,
            message: { err: 'Error occurred in homeController.newChat. Check server logs for more details.' },
        }));

        // .then(resp => res.locals.new = resp.rows)
        // .then(data => console.log(res.locals.new))
        // .then((data) => next())
        // .catch(
        //     (err) => {
        //         next('issues with newChat middleware', err)
        // })
}

homeController.loadChat = (req, res, next) => {
    const title = req.body.title
    const sqlQuery = `SELECT * FROM ${title}_chatroom `;
    // const sqlQuery = ` 
    // SELECT * 
    // FROM chatrooms; 
    // `;
    db.query(sqlQuery)
        .then(data => {
          console.log(data);
          res.locals.chat = data.rows
          return next();
        })
        .catch((err) => {next('issues with loadChat middleware: ', err)})
}

// homeController.getFavorites = (req, res, next) => {
//     const userId = req.query.id;
//     const sqlQuery = `\
//     SELECT u.favs \
//     FROM userTable u \
//     WHERE u.user_id = ${userId};
//     `;

//     db.query(query)
//     // currently only working if user has favorites, if they don't then we get an error 
//       .then((data) => {res.locals.favorites = data.rows})
//       .then(data => 
//         next())
//       .catch((err) => {
//         console.log('error in getFavorites middleware')  
//         next(err)
//     })      
// }

// homeController.logOut = (req, res, next) => {
    
// }

// homeController.lockedChat = (req, res, next) => {
//      // get the chatid from the request
//     const chatId = req.body.title;

//     // const sqlQuery;
   
//     // prompt a password 
//     // if successful, then load the chat
//     // else, load a 'wrong pass!' alert
    
// }

module.exports = homeController;