import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from './AdminReportCard.module.css';

const AdminReportCard = (props) => {
    const serverUrl =  process.env.REACT_APP_SERVER_URL
    const { report, reportBy, reportedUser, isDeleted, handleDelete } = props;

    const [reporterName, setReporterName] = useState('');
    const [reportedName, setReportedName] = useState('');

    useEffect(() => {
        async function fetchReporterName() {
            try {
                const response = await axios.get(`${serverUrl}/api/user/${reportBy}`);
                setReporterName(response.data.username);
            } catch (error) {
                console.error('Error fetching reporter name:', error);
            }
        }

        fetchReporterName();
    }, [reportBy]);

    useEffect(() => {
        async function fetchReportedUserName() {
            try {
                const response = await axios.get(`${serverUrl}/api/user/${reportedUser}`);
                setReportedName(response.data.username);
            } catch (error) {
                console.error('Error fetching reported User :', error);
            }
        }

        fetchReportedUserName();
    }, [reportedUser]);

    return isDeleted ? null : (
        <div className={classes["reportcontent-card"]}>
            <div className={classes["leftcontent"]}>
                <h2>Reported by {reporterName}</h2>
                <div className={classes["reporteduserContainer"]}>
                    <div >
                        <img src='/icons/warningIcon.png' alt="Report Icon"/>
                    </div>
                    <div className={classes["divider"]}></div>
                    <input className={classes["reporteduserContainer-input"]} type="text" name="reportuser" value={reportedName+" (you)"} readOnly/>        
                </div>
            </div>
            
            <div className={classes["reportdescContainer"]}>
                <h3><label htmlFor="reportbox">Report Description:</label></h3>
                <textarea id="reportbox" name="reportbox" value={report} readOnly></textarea>
                <div className={classes["button-container"]}>
                    <button className={classes["ban-button"]} onClick={handleDelete}>Delete</button>
                </div>
            </div> 
        </div>
    );
};

export default AdminReportCard;
