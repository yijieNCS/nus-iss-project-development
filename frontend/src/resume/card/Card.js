// Card.js
import React from 'react';
import styles from './card.module.css'; 

const Card = ({ subject,topic, rate, yearsexp}) => {
  return (
    <div className={styles["card"]}>
      <h2>{subject}</h2>
      <p>Topic: {topic}</p>
      <p>Rate: ${rate}/hr</p>
      <p>Years of Experience: {yearsexp}</p>
    </div>
  );
}

export default Card;
