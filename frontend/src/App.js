import logo from './logo.svg';
import './App.css';
import TopHeader from './header/header';
import React from 'react';
import SideNavBar from './navbar/navbar';
class App extends React.Component {
  render() {
    return (
      <div className = "grid-container">
        <div className="top-header"><TopHeader /></div>
        <div className="side-nav-bar"><SideNavBar /></div>
      </div>
      
    ); 
  }
}

export default App;