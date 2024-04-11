

import React from "react";
import classes from "./AdminCard.module.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminCard = ({ ...props }) => {
  return props.isBanned ? null : (
    <div className={classes["reportcontent-card"]}>
      <h2>User: {props.username}</h2>
      <div className={classes["input-container"]}>
        <div className={classes["input-icon"]}>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className={classes["divider"]}></div>
        <input type="text" name="email" placeholder="Email" value={props.email} readOnly={true} />
      </div>
      <div className={classes["button-container"]}>
        <button className={classes["ban-button"]} onClick={props.handleBan}>
          Ban
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
