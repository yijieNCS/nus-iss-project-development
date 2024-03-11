import React from 'react';
import './header.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
class TopHeader extends React.Component {
  render() {
    return (
      <div>
       <div className ="sglearner-title "> <h1>SGLearner</h1></div>
       <div><h1>Resume</h1></div>
       <div><FontAwesomeIcon icon={faUser} /></div>
        
        {/* Add any other content you want in the header */}
      </div>
    );
  }
}

export default TopHeader;