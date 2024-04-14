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

const CardList = ({ services, deleteService, editService }) => {
  return (
    <div className={styles["card-list2"]}>
      {services.map((service, index) => (
        <Card
          key={service.serviceId}
          subject={service.subject}
          topic={service.topic} 
          rate={service.rate}
          yearsexp={service.experience} 
          serviceid={service.serviceId}
          deleteService={deleteService}
          editService={() => editService(service.serviceId)} // Pass the serviceId to the editService function
        />
      ))}
    </div>
  );


}


export default CardList;
