import React from 'react';
import NavigationBar from './NavigationBar.jsx';

const AppContainer = ({ children }) => (
  <div id="main" className="container-fluid">

    { children }
  </div>
);

export default AppContainer;
