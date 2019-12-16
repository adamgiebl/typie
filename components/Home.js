import React, { Component } from 'react';
import styled from 'styled-components';
import { Consumer } from './MyContext';

export default class Home extends Component {
  state = {
    player: '',
    password: '',
    roomName: '',
  }
  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };
  
  render() {
    return (
      <Consumer>
        {context => (
          <div>
            <Form onSubmit={e => context.createRoom(this.state.roomName, this.state.password, e)}>
              <input type="text" name="password" value={this.state.password} placeholder="password" onChange={this.handleInputChange} />
              <input type="text" name="roomName" value={this.state.roomName} placeholder="room name" onChange={this.handleInputChange} />
              <Submit type="submit" />
            </Form>
            <RoomList>
              {context.roomList.length > 0 &&
                <div>
                  {context.roomList.map(room => ( 
                    <RoomListItem key={room.name} name={room.name} onClick={context.joinRoom}>{`${room.name} heslo: ${room.password}`}</RoomListItem>
                  ))}
                </div>}
            </RoomList>
          </div>
        )}
      </Consumer>
    );
  }
}

const Form = styled.form`
  border: 3px solid white;
  padding: 20px;
`;
const Submit = styled.input`
  width:100px;
`;
const RoomList = styled.form`
  border: 3px solid white;
  padding: 20px;
`;
const RoomListItem = styled.div`
  cursor: pointer;
  padding: 20px;
  border: 2px solid red;
`;
