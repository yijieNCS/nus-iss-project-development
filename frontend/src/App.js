import logo from './logo.svg';
import './App.css';
import TopHeader from './header/header';
import React from 'react';
import SideNavBar from './navbar/navbar';
import CardList from './services/card/cardlist';

class App extends React.Component {
  render() {
    return (
      <div >
        <div><TopHeader /></div> 
        <div className="body-container">
          <div className="side-nav-bar"><SideNavBar /></div>
          <CardList />
        </div>
      </div>
      
    ); 
  }
}

export default App;