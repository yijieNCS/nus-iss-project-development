import React from 'react'
import classes from './ContentCard.module.css'

export function ContentCard(props) {

    const { firstName, timing, location, status } = props

    return (
        <div className={classes['content-card']}>
            <div className={classes['content-card-profile-picture']}>
                <p>Hello</p>
            </div>
            <div className={classes['content-card-information']}>
                <img src="/icons/studentIcon.png" alt="User Icon"/>
                <p>{firstName}</p>
            </div>
            <div className={classes['content-card-information']}>
                <img src="/icons/clockIcon.png" alt="clockIcon Icon"/>
                <p>{timing}</p>
            </div>
            <div className={classes['content-card-information']}>
                <img src="/icons/locationIcon.png" alt="location Icon"/>
                <p>{location}</p>
            </div>
            <div className={classes['content-card-information']}>
                <img src="/icons/statusIcon.png" alt="status Icon"/>
                <p>{status}</p>
            </div>
        </div>
    )
}