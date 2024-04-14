// Card.js
import React from 'react';
import styles from './card.module.css'; 
import { Modal, Input,Form} from 'antd';
import axios from 'axios';

const Card = ({ subject, topic, rate, yearsexp, serviceid, deleteService, editService }) => {
  console.log(serviceid);
  const handleDelete = async () => {
    try {
      await deleteService(serviceid); // Call deleteService function passed from parent
    } catch (error) {
      console.error('Error deleting service: ', error);
    }
  };

  return (
    <div className={styles["card"]}>
      <h2>{subject}</h2>
      <p>Topic: {topic}</p>
      <p>Rate: ${rate}/hr</p>
      <p>Years of Experience: {yearsexp}</p>
      <button onClick={() => editService(serviceid)}>Edit</button> {/* Call editService when the button is clicked */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}


export default Card;
