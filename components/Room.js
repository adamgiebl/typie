import React, { Component } from 'react';

export default class Room extends Component {
  state = {
    player: '',
  }
  render() {
    return (
      <div>
        ahoj jsem v roomce {this.props.match.params.joinedRoomName}
      </div>
    );
  }
}
