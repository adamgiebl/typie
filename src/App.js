import React from 'react';
import styled from 'styled-components'
import Game from './game'


function App() {
  return (
    <Container className="App">
      <header className="App-header">
      </header>
      <Game />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default App;
