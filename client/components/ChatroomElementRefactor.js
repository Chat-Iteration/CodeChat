import React from 'react';
import { useNavigate } from "react-router-dom";
import ChatroomPassword from '../components/ChatroomPassword';
import { Link } from "react-router-dom";

const ChatroomElementRefactor = props => {

  const navigate = useNavigate();

  return(
    <div className='chatroomrows'>
      <h2 onClick={(e) => {
        navigate('/chatroom', {state: {name: props.name, room: props.chatroomName}});
      }}>Chatroom Title: {props.chatroomName}</h2>

      {/* <Link to={`/chatroom?name=${props.name}&room=${props.chatroomName}`}>
        <button type='submit'>Chatroom Title: {props.chatroomName}</button>
    </Link> */}
    </div>
  );
};

export default ChatroomElementRefactor;