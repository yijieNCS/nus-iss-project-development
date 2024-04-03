import React from 'react';
import './header.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
class TopHeader extends React.Component {
  render() {
    return (
      
       <header className="header">
        <div className="resume">Resume</div>
        <div className="sglearner">SGLearner</div>
        <div className = "profile-icon"><FontAwesomeIcon size ={"1x"} icon={faUser}  /></div>
        
      </header>
       
      
    );
  }
}

export default TopHeader;