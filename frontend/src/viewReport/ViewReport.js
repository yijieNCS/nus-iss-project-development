import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import classes from './ViewReport.module.css'
import React, {useContext, useEffect, useState} from "react"
import UserContext from "../context/UserContext";
import axios from "axios";
import ReportCard from "./reportcard/ReportCard"; // Import as default

const ViewReport = () => {

    const [reports, setReports] = useState([])

    const userContext = useContext(UserContext);
    const userId = userContext.userId;

    useEffect(() => {
        async function getReports() {
            try {
                console.log("userId: in view "+userId)
                const reportsData = await axios.get(`http://localhost:8080/api/reporteduser/${userId}`)
                console.log("Response:", reportsData);
                setReports(reportsData.data)
            } catch (error) {
                console.error('Error fetching the reports: ', error)
            }
        }

        if (userId) {
            getReports();
        }
    }, [userId]);
    // api/reporteduser/


    useEffect(() => {
        console.log('The reports:', reports);
    }, [reports])


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