import React, {useContext, useEffect, useState} from "react"
import classes from './geninfo.module.css';

const Geninfo = ({ user }) => {
    console.log(user.name)
    return (
    <div className={classes["user-info-box"]}>
        
        <div className={classes["centered"]}>
        <h2>General Information</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Education:</strong> {user.education}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {/* Add more user info fields as needed */}
        </div>
    </div>
    
);
};
    export default Geninfo;




