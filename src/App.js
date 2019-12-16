import React, { Component } from 'react';
import styled from 'styled-components';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import SocketForm from './components/SocketForm';
import Room from './components/Room';
import Home from './components/Home';
import { Provider, Consumer } from './components/MyContext';
// import Cookies from './components/Cookies';

export class App extends Component {
  state = {
    name: '',
    value: '',
  }
  
  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };
  
  render() {
    const context = this.props.context;
    return (
      <React.Fragment>
        <Router>
          <Wrapper>
            <SocketForm socket={context.socketId} />
            {context.joinedRoomName !== '' && <Redirect to={`/:${context.joinedRoomName}`} />}
            <Switch>
              <Route exact path="/" />
              <Route path="/nickname" />
              <Route path="/home" component={Home} />
              <Route path="/:joinedRoomName" component={Room} />
              <Redirect to="/" />
            </Switch>
          </Wrapper>
        </Router>
      </React.Fragment>
    );
  }
}
export default props => (
  <Provider>
    <Consumer>
      {context => <App context={context} />}
    </Consumer>
  </Provider>
);

const Wrapper = styled.div`
  background: royalblue;
  width:100vw;
  height: 100vh;
  color: ghostwhite;
`;
