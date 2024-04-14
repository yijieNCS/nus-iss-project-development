
import React, {useEffect, useState} from "react"
import axios from "axios";
import classes from './UserCard.module.css'
import {  faEnvelope, faBirthdayCake,faTransgender } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserCard = ({...props}) => {

    return props.isBanned ? null :(  
        <div className={classes["reportcontent-card"]}>
           <h2>User: {props.username}</h2>
           <div className={classes["input-container"]}>
                <div className={classes["input-icon"]}>          
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className={classes["divider"]}></div>
                <input type="text" name="email" placeholder="Email" value={props.email} readOnly={true}/>
                
            </div>
            <div className={classes["input-container"]}>
                <div className={classes["input-icon"]}>          
                    <FontAwesomeIcon icon={faBirthdayCake} />
                </div>
                <div className={classes["divider"]}></div>
                <input type="text" name="birthDate" placeholder="birthDate"  value={props.birthDate.split("T")[0]} readOnly={true}/>
                
            </div>
            <div className={classes["input-container"]}>
                <div className={classes["input-icon"]}>          
                    <FontAwesomeIcon icon={faTransgender} />
                </div>
                <div className={classes["divider"]}></div>
                <input type="text" name="gender" placeholder="gender"  value={props.gender} readOnly={true}/>
            </div>
            <div className={classes["button-container"]}>
            <button className={classes["ban-button"]} onClick={props.handleBan}>Ban</button>
            </div>
            
        </div>
    );
}
 
export default UserCard;