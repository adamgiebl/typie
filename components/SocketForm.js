import React from 'react';
import styled from 'styled-components';


const SocketForm = ({ socket }) => (
  <Socket>
    {socket}
  </Socket>
);

export default SocketForm;


const Socket = styled.form`
  border: 3px solid white;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
`;
