import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './containers/Login';
// import Chatroom from './containers/Chatroom';
import MessageBoard from './containers/MessageBoard';
import ChatroomRefactor from './containers/ChatroomRefactor';

// const URL_PARAMS = new URLSearchParams(window.location.search);
const url = new URL(window.location);
const token = url.search; // ?access_token=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&scope=&token_type=bearer

const URL_PARAMS = new URLSearchParams(token);
const accessToken = URL_PARAMS.get('access_token');
let name;
if (url.search) {
  name = url.search.split('?')[2].split('=')[1]
}
// access_token

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: 'Michael',
      currentChatroom: '',
      token: null,
      login: null,
      // loggedIn: false,
      loggedIn: false,
      chatrooms: [{title:'Michael', status:'Closed', password:''}, {title:'Kai', status:'Closed', password:''}, {title:'Catilin', status:'Open', password:''}],
      favorites: ['Brian', 'Eric', 'Kerolos', 'Mike'],
    };
    // const [token, setToken] = useState();
    this.logIn = this.logIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(){
    console.log('access token', accessToken);
    // ?access_token=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&scope=&token_type=bearer?name=mykongee
    // console.log(url.search.split('?')[2].split('=')[1]);
    console.log(name);
    this.setState({
      ...this.state,
      token: accessToken,
      login: name
    })
    fetch('/')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        return this.setState({
          ...this.state,
          chatrooms: data
        });
      })
      .catch(err => console.log('App.componentDidMount: getChatrooms: ERROR: ', err));
  }

  logIn() {
    this.setState({
      ...this.state,
      loggedIn: true
    })
  }

  signOut() {
    this.setState({
      ...this.state,
      loggedIn: false
    })
  }

  refresh() {
    fetch('/')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        return this.setState({
          ...this.state,
          chatrooms: data
        });
      })
      .catch(err => console.log('App.js METHOD refresh ERROR: ', err));
  }


  render() {
    // if(!this.state.loggedIn) {
    //   return (<Login handleClick={this.logIn}/>)
    // }

    if (!this.state.token) {
      return <Login handleClick={this.logIn} />
    }
    
    // return (
    //   <div>
    //     <h1>oauthed</h1>
    //   </div>
    // );
    // cosnst 

    return (
      <div id='container'>
        <Router>
          <Routes>
            {/* <Route exact path='/' element={<MessageBoard refresh={this.refresh} signout={this.signOut} chatrooms={this.state.chatrooms} favorites={this.state.favorites}/>} /> */}
            <Route exact path='/' element={<MessageBoard refresh={this.refresh} signout={this.signOut} name={this.state.login} chatrooms={this.state.chatrooms} favorites={this.state.favorites}/>} />
            <Route path='/chatroom' element={<ChatroomRefactor info='test room' />} />
            {/* <Route path='/chatroom/:id' element={<ChatroomRefactor info='test room' />} /> */}
            {/* <Route path='/chatroom' element={<Chatroom />} /> */}
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
