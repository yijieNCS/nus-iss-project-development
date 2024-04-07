import React from 'react'
import classes from './ContentCard.module.css'

export function ContentCard({...props}) {

    return (
        <div className={classes['content-card']}>
            <div className={classes['content-card-profile-picture']}>
                <p>Hello</p>
            </div>
            <div className={classes['content-card-information']}>
                <img src="/icons/studentIcon.png" alt="User Icon"/>
                <p>{props.firstName}</p>
            </div>
            <div className={classes['content-card-information']}>
                <img src="/icons/clockIcon.png" alt="clockIcon Icon"/>
                <p>{props.timing}</p>
            </div>
            <div className={classes['content-card-information']}>
                <img src="/icons/locationIcon.png" alt="location Icon"/>
                <p>{props.location}</p>
            </div>
            <div className={classes['content-card-information']}>
                <img src="/icons/statusIcon.png" alt="status Icon"/>
                <p>{props.status}</p>
            </div>
            <div className={classes['content-card-information']}>
                <img src="/icons/statusIcon.png" alt="status Icon"/>
                <p>{props.gender}</p>
            </div>
            {props.education && (
                <div className={classes['content-card-information']}>
                    <img src="/icons/statusIcon.png" alt="status Icon"/>
                    <p>{props.education}</p>
                </div>
            )}
            {props.subject && (
                <div className={classes['content-card-information']}>
                    <img src="/icons/statusIcon.png" alt="status Icon"/>
                    <p>{props.subject}</p>
                </div>
            )}
            {props.topic && (
                <div className={classes['content-card-information']}>
                    <img src="/icons/statusIcon.png" alt="status Icon"/>
                    <p>{props.topic}</p>
                </div>
            )}
            {props.rate && (
                <div className={classes['content-card-information']}>
                    <img src="/icons/statusIcon.png" alt="status Icon"/>
                    <p>{props.rate}</p>
                </div>
            )}
        </div>
    )
}