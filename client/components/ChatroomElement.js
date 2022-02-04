import React from 'react';
import { useNavigate } from "react-router-dom";
import ChatroomPassword from '../components/ChatroomPassword';
import { Link } from "react-router-dom";

const ChatroomElement = props => {

  const navigate = useNavigate();

  if(props.status === 'closed') return(
    <div className='chatroomrows'>
      <h2>Chatroom Title: {props.chatroomName}</h2>
      <button onClick={(e) => {
        document.querySelector(`#password${props.i}`).style.display='block';
      }}>Locked</button>
      <ChatroomPassword i={props.i} name={props.name} chatroomName={props.chatroomName} password={props.password} />
    </div>
  );

  return(
    <div className='chatroomrows'>
      <h3 class='chat-room-btn' onClick={(e) => {
        // navigate(`/chatroom/${props.chatroomName}`);
        // navigate(`/chatroom?name=${props.name}&room=${props.chatroomName}`);
        navigate('/chatroom', {state: {name: props.name, room: props.chatroomName}});
      }}>Chatroom Title: {props.chatroomName}</h3>

      {/* <Link to={`/chatroom?name=${props.name}&room=${props.chatroomName}`}>
        <button type='submit'>Chatroom Title: {props.chatroomName}</button>
    </Link> */}
    </div>
  );
};

export default ChatroomElement;