import React from 'react';
import './Message.css';

const Message = props => {
  let isSentByCurrentUser = false;
  // props should have a message and username properties
  const { name, message } = props;

  return (
    // <div>
      // <h2> {name} : {message} </h2>
    // </div>
    <li>
      {name} : {message}
    </li>
  )
  // const { msgReceived: { user, message }, username} = props;
  // const author = user;
  // if (author === username) isSentByCurrentUser = true;

  // if (isSentByCurrentUser) return (
  //   <div className='messageContainer justifyEnd backgroundBlue'>
  //     <div className='textContainer'>
  //       <p>{message}</p>
  //     </div>
  //     <p className='sent'>{author}</p>
  //   </div>
  // );
  // else return (
  //   <div className='messageContainer justifyStart backgroundWhite'>
  //     <p className='sent'>{author}</p>
  //   </div>
  // );
};

export default Message;