import React from 'react';
import ChatRoomInfo from '../client/components/ChatRoomInfo.js'
import { render, screen, waitFor } from '@testing-library/react'


describe('Unit testing React components', ()=>{
    describe('Chatroominfo test',()=>{
        
        beforeAll(()=>{
            render(<ChatRoomInfo room={'Test'}/>)
        })  

        test('Render the chatroom info with the correct title',()=>{
            expect(screen.getByRole('heading')).toHaveTextContent('Test');
            expect(screen.getAllByRole('heading')).toHaveLength(1);
            // expect(component.)
        })
    })

    describe('Chatroom input test',()=>{

    })

})

// Messageboard, chatroomelement, favoriteelement, addchatroom

// chatroom, chatroominfo, messages, input
// chatroominfo test 
// -> make sure div has classname 'infoBar'
// -> make sure inside div has h4
