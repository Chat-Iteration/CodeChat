import React from 'react';
import ChatroomElement from '../components/ChatroomElement';
import FavoriteElement from '../components/FavoriteElement';
import AddChatroom from '../components/AddChatroom';
import ChatroomRefactor from './ChatroomRefactor';
import { Routes, Route, Link } from 'react-router-dom';

const MessageBoardRefactor = props => {
    const chatrooms = props.chatrooms.map((el, i) => <ChatroomElement key={i} i={i} name={props.name} chatroomName={el.title} status={el.status} password={el.password}/>)
    const favorites = props.favorites.map((el, i) => <FavoriteElement key={i} i={i} name={props.name} chatroomName={el} />)
  

    

    return (
        <div className='messageBoard'>
            <h1>Hello {props.name}</h1>
            <AddChatroom refresh={props.refresh} />
            <header>
                <h1>Chatrooms</h1>
                <button onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#addChatroom').style.display='block';
                }}>Create chatroom</button>
            </header>
            <main>
                <nav>
                    <h2 id='favorites'>Favorites</h2>
                    {favorites}
                    <button onClick={props.signout}>Sign Out</button>
                </nav>
                <section>
                    <Routes>
                        {chatrooms}
                    </Routes>
                </section>
            </main>
        </div>
    )

}

export default MessageBoardRefactor;