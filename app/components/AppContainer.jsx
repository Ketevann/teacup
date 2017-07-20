import React from 'react';
import NavBar from './NavBar.jsx';

const AppContainer = ({ children }) => (
  <div id="main" className="container-fluid">

    { children }
  </div>
);

export default AppContainer;
