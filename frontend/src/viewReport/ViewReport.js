import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import classes from './ViewReport.module.css'
import React, { useEffect, useState} from "react"
import axios from "axios";
import ReportCard from "./reportcard/ReportCard"; // Import as default

const ViewReport = () => {

    const [reports, setReports] = useState([])

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const userId = userData ? userData.userId : null;
        if (userId) {
            getReports(userId);
        }
    }, []);

    const getReports = async (userId) => {
        try {
            console.log("userId: in view " + userId);
            const reportsData = await axios.get(`http://localhost:8080/api/reporteduser/${userId}`);
            console.log("Response:", reportsData);
            setReports(reportsData.data);
        } catch (error) {
            console.error('Error fetching the reports: ', error);
        }
    };

    useEffect(() => {
        console.log('The reports:', reports);
    }, [reports]);


    return ( 
        <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <main className={classes["content"]}>
                {reports.map(report => (
                    <ReportCard
                        key={report.reportId}
                        report={report.report}
                        reportedUser={report.reportedUser}
                        reportBy={report.reportBy}
                    />
                ))}           
            </main>
        </div>
     );
}

export default ViewReport;