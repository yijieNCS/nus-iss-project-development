
import classes from './ReportCard.module.css'
import React, {useEffect, useState} from "react"
import axios from "axios";


const ReportCard = (props) => {

    const { report, reportedUser, reportBy } = props

    const [reporterName, setReporterName] = useState('');
    const [reportedName, setReportedName] = useState('');

    useEffect(() => {
        async function fetchReporterName() {
            try {
                console.log("reportby "+reportBy)
                const response = await axios.get(`http://localhost:8080/api/user/${reportBy}`);
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
                console.log("reportUser "+reportedUser)
                const response = await axios.get(`http://localhost:8080/api/user/${reportedUser}`);
                setReportedName(response.data.username);
            } catch (error) {
                console.error('Error fetching reported User :', error);
            }
        }

        fetchReportedUserName();
    }, [reportedUser]);
    
    return ( 
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
                <h3><label for="reportbox">Report Description:</label></h3>
                <textarea id="reportbox" name="reportbox" value={report} readOnly></textarea>
            </div> 
        </div>

     );
}
 
export default ReportCard;