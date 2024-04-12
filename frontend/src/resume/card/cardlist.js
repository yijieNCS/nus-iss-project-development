// CardList.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import styles from './cardlist.module.css'; // Import your CSS file for styling
import axios from "axios";

const CardList = () => {
  const [services, setServices] = useState([]);
  const serverUrl =  process.env.REACT_APP_SERVER_URL

  const getServices = async () => {
    try {
      const sessionsData = await axios.get(`${serverUrl}/api/services/`);
      setServices(sessionsData.data);
    } catch (error) {
      console.error('Error fetching the session: ', error);
    }
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className={styles["card-list2"]}>
      {services.map((service, index) => (
          <Card
            subject={service.subject}
            topic={service.topic} 
            rate={service.rate}
            yearsexp={service.experience} 
          />
      ))}
    </div>
  );
}

export default CardList;
