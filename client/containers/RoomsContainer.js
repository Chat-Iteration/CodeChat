import React from 'react';
import ChatroomRefactor from './ChatroomRefactor';
import rooms from './Rooms.css'
class RoomsContainer extends React.Component {


    render() {
        return (
            <div className='rooms'> 
                <ChatroomRefactor name={this.props.name} info="Room 1️⃣"/> 
                <ChatroomRefactor name={this.props.name} info="Room 2️⃣"/> 
            </div>
        )
    }
}

export default RoomsContainer;