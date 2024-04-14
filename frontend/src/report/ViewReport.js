import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import classes from './ViewReport.module.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportCard from "./reportcard/ReportCard";
import AdminReportCard from "./reportcard/AdminReportCard";

const ViewReport = () => {
    const serverUrl =  process.env.REACT_APP_SERVER_URL;
    const [reports, setReports] = useState([]);
    const [isAdmin, setIsAdmin] = useState([]);
    const [deletedReports, setDeletedReports] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (userData.admin === 1) {
            setIsAdmin(true);
            getAllReports()
        } 
        else {
            setIsAdmin(false);
            const userId = userData ? userData.userId : null;
            if (userId) {
                getReportsById(userId);
            }
        }
    }, []);

    useEffect(() => {
        console.log('The reports:', reports);
    }, [reports]);

    const getAllReports = async () => {
        try {
            
            const reportsData = await axios.get(`${serverUrl}/api/reports/`);
            console.log("Response:", reportsData);
            setReports(reportsData.data);
        } catch (error) {
            console.error('Error fetching the reports: ', error);
        }
    };
    const getReportsById = async (userId) => {
        try {
            const reportsData = await axios.get(`${serverUrl}/api/reporteduser/${userId}`);
            console.log("Response:", reportsData);
            setReports(reportsData.data);
        } catch (error) {
            console.error('Error fetching the reports: ', error);
        }
    };


    const handleDelete = async (reportId) => {
        try {
            await axios.delete(`${serverUrl}/api/report/${reportId}`);
            setDeletedReports([...deletedReports, reportId]);
        } catch (error) {
            console.error("Error deleting report:", error);
        }
    };

    return ( 
        <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <main className={classes["content"]}>
                {
                    isAdmin 
                    ? reports.map(report => (
                        <AdminReportCard
                            key={report.reportId}
                            report={report.report}
                            reportedUser={report.reportedUser}
                            reportBy={report.reportBy}
                            isDeleted={deletedReports.includes(report.reportId)} 
                            handleDelete={() => handleDelete(report.reportId)}
                        />
                    ))   
                    : reports.map(report => (
                        <ReportCard
                            key={report.reportId}
                            report={report.report}
                            reportedUser={report.reportedUser}
                            reportBy={report.reportBy}                      
                        />
                    ))      
                }           
            </main>
        </div>
     );
}

export default ViewReport;
