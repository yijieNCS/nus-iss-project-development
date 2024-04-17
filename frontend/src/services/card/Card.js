// Card.js
import React from 'react';
import styles from './card.module.css';
import {NavLink} from "react-router-dom";

const Card = ({serviceId, subject, topic, rate, tutorname, tutorId}) => {

    const tutorName = tutorname
    console.log(`Service Id is ${serviceId}`)

    return (
        <NavLink
        to='/addsession'
        state={{serviceId, subject, topic, rate, tutorName, tutorId}}
        className={styles["card"]}
        >
                <h2>{subject}</h2>
                <p>Topic: {topic}</p>
                <p>Rate: ${rate}/hr</p>
                <p>Tutor: {tutorName}</p>
        </NavLink>
    );
}

export default Card;
