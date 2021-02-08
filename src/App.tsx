import React from 'react';
import styled from 'styled-components';
// components
import BingoGrid from './components/BingoGrid';

const AppContainer = styled.div`
  text-align: center;
  background-color: #b4c2ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: calc(10px + 1.5vmin);
  color: #131313;
`;

const App = () => (
  <AppContainer>
    <h2>Conference Call Bingo!</h2>
    <BingoGrid />
  </AppContainer>
);

export default App;
