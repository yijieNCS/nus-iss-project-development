import React from 'react'
import classes from './ContentCard.module.css'

export function ContentCard(props) {

    const { studentId, timing, location, status } = props

    return (
        <div className={classes['content-card']}>
            <div className={classes['content-card-profile-picture']}>
                <p>Hello</p>
            </div>
            <div className={classes['content-card-user']}>
                <img src="/icons/studentIcon.png" alt="User Icon"/>
                <p>{studentId}</p>
            </div>
            <div className={classes['content-card-time']}>
                <img src="/icons/clockIcon.png" alt="User Icon"/>
                <p>{timing}</p>
            </div>
            <div className={classes['content-card-location']}>
                <img src="/icons/locationIcon.png" alt="User Icon"/>
                <p>{location}</p>
            </div>
        </div>
    )
}