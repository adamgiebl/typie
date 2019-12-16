import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://127.0.0.1:4000');
const MyContext = React.createContext(); 

export class Provider extends Component {
  state = {
    socketId: '',
    roomName: '',
    joinedRoomName: '',
    password: '',
    roomList: [],
    joinRoom: (e) => {
      socket.emit('join', e.target.getAttribute('name'));
    },
    createRoom: (name, password, e) => {
      e.preventDefault();
      socket.emit('create', name, password);
      this.setState({
        roomName: '',
        password: '',
      });
    },
  }
  componentDidMount = () => {
    socket.on('socketid', (socketId) => { 
      this.setState({ socketId });
    });
    socket.on('refreshList', (list) => {
      this.setState({ roomList: list });
    });
    socket.on('join', (roomName) => {
      this.setState({ joinedRoomName: roomName });
    });
  };
  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export const Consumer = MyContext.Consumer;
