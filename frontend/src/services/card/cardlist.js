import React, { useState, useEffect } from 'react';
import Card from './Card';
import styles from './cardlist.module.css'; 
import axios from "axios";

const CardList = ({ searchData }) => {
  const [services, setServices] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL

  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (searchData && searchData.length > 0) {
          console.log('Using search results');
          setServices(searchData);
        } else {
          console.log('Using original');
          const sessionsData = await axios.get(`${serverUrl}/api/services/`);
          console.log('Fetched data:', sessionsData.data);
          setServices(sessionsData.data);
        }
      } catch (error) {
        console.error('Error fetching the session: ', error);
      }
    };

    fetchServices();
  }, [searchData]);

  return (
    <div className={styles["card-list"]}>
      {services.map((service, index) => (
        <Card
          key={service.index}
          serviceId={service.serviceId}
          subject={service.subject}
          topic={service.topic}
          rate={service.rate}
          tutorname={service.tutorname}
          tutorId={service.userId}
        />
      ))}
    </div>
  );
}

export default CardList;