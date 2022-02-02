import React from 'react';
import Message from './Message.js';

const Messages = props => {
  // props should have a messages and username properties
  // let { messages, name } = props;
  let { messages } = props; 
  // messages is array of objects {message: 'msg', name: 'username'}

  // const msgs = messages.map(msgReceived => {
  //   return <div><Message msgReceived={msgReceived} username={username} /></div>;
  // });
  const messageMaker = (message) => {
    return <Message {...message} />
  }
  const msgs = messages.map((msg) => messageMaker(msg));
  return (
    <div className='messagesContainer'>
      {msgs}
    </div>
    );
};

export default Messages;