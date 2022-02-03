import React from 'react';
import io from 'socket.io-client';
import './Chatroom.css';

import ChatRoomInfo from '../components/ChatRoomInfo';
import Messages from '../components/messages/Messages';
import Input from '../components/Input';
import Message from '../components/messages/Message';

// import clientSocket from '../components/socketConnection.js';

class ChatroomRefactor extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io();

        // get room name from props to test multiple
        this.state = {
            // name: 'Mike',
            name: (Math.floor(Math.random() * 20)).toString(),
            room: 'Test room',
            message: '',
            messages: [],
        }

        this.handleInput = this.handleInput.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    // get room name from props to test multiple
    componentDidMount() {
        console.log(this.props);

        this.socket.open();
        // this.state.room = this.props.info;
        // joins room1 or room2
        this.socket.emit('join', this.props.info); 
        // this.socket.emit('join', this.state.room);
        console.log(this.socket);
        this.socket.on('ping', msg => {
            console.log('from server: ', msg);
        })
        this.socket.on('message', msg => {
            this.setState({
                ...this.state,
                messages: this.state.messages.concat([msg])
            })
            // console.log(this.state.messages);
        }) 
    }
    
    componentWillUnmount() {
        this.socket.close();
    }

    handleInput(val) {
        this.setState({
            ...this.state,
            message: val
        });
        console.log(val);
    }

    sendMessage(e) {
        e.preventDefault();
        console.log(this.props.info);
        console.log(this.state.message);
        const bad = ['bitch','fucked','fuck','fuckk','fucker','shit','dick','ass', 'sqlsucks','mongoisgood'];
        const messageArr = this.state.message.split(' ');
        for (let word of messageArr) {
            if (bad.includes(word.toLowerCase())) {
                messageArr.splice(messageArr.indexOf(word), 1, '****');
            }
        }
        const filteredMessage = messageArr.join(' ');

        const payload = {info: this.props.info, name: this.state.name, message: filteredMessage};
        console.log('from send message: ', payload);
        this.socket.emit('sendMessage', payload);
    }

    render() {
        return (
        <div className='chatroom'>
            <div className='container'>
                <ChatRoomInfo room={this.props.info} />
                {/* <ChatRoomInfo room={this.state.room} /> */}
                <Messages messages={this.state.messages} name={this.state.name}/>
                <Input setMessage={this.handleInput} sendMessage={this.sendMessage} message={this.state.message}/>
            </div>
        </div>
        )
    }
}

export default ChatroomRefactor;