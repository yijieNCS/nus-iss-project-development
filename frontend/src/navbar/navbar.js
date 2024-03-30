import React from 'react';
import './navbar.css'; // Import your CSS file for styling


class SideNavBar extends React.Component {
  render() {
    return (
    
      <div >
        <ul>
        <li><a href="#">Home</a></li>
          <li><a href="#">Sessions</a></li>
          <li><a href="#">Resume</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Report</a></li>
        </ul>
      </div>
    );
  }
}

export default SideNavBar;