// Card.js
import React from 'react';
import styles from './card.module.css'; 

const Card = ({ subject,topic, rate, tutorname}) => {
  return (
    <div>
      <h2>{subject}</h2>
      <p>{topic}</p>
      <p>{rate}</p>
      <p>{tutorname}</p>
    </div>
  );
}

export default Card;
