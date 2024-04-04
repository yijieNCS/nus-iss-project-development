import React from 'react'
import classes from './SideBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NavLink} from 'react-router-dom'
import { useState, useRef ,useEffect} from 'react';
import axios from "axios";
import UserFactory from '../../userModel/UserFactory';
import AdminUser from '../../userModel/AdminUser';

export function SideBar() {

    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        const userId = JSON.parse(sessionStorage.getItem('userData')).userId;
        console.log("sideBaruserid: "+userId)
        if (userId) {
            fetchUserInfo(userId);
        }
    }, []);

    const fetchUserInfo = async (userId) => {
        try {
            const userData = await axios.get(`http://localhost:8080/api/user/${userId}`);
            console.log("sideBaradmin: "+userData.data.admin)
            const user = UserFactory.createUser(userData.data); // Create user object using UserFactory
            const isAdmin = user instanceof AdminUser;
            console.log("isAdmin: "+isAdmin)
            setIsAdmin(isAdmin)
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };
    
    return (
        <aside className={classes.sidebar}>
            <div className={classes['sidebar-title']}>
                <img className={classes['sidebar-icon']} src="/SgLearnerIcon.png" alt='SGLearner Icon'/>
                <h2 className={classes['sidebar-company-title']}>SGLearner</h2>
            </div>
            <ul className={classes['sidebar-menu']}>
                <li>
                    <ul className={classes['sidebar-sub-menu']}>
                        <li className={classes['sidebar-sub-menu-title']}>
                            <h2>Dashboard</h2>
                            <img src='/icons/dashBoardIcon.png' alt="Dashboard Icon"/>
                        </li>
                        <li className={classes['sidebar-sub-menu-options']}>
                            <img src="/icons/sessionsIcon.png" alt="Session Icon"/>
                            <NavLink to="/sessions">Upcoming Sessions</NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className={classes['sidebar-sub-menu']}>
                        <li className={classes['sidebar-sub-menu-title']}>
                            <h2>Services</h2>
                            <img src='/icons/servicesIcon.png' alt='Service Icon'/>
                        </li>
                        <li className={classes['sidebar-sub-menu-options']}>
                            <img src="/icons/appointmentIcon.png" alt="Appointment Icon"/>
                            <a href="/services">Book Appointment</a>
                        </li>
                        <li className={classes['sidebar-sub-menu-options']}>
                            <img src="/icons/createServiceIcon.png" alt="Create Service Icon"/>
                            <a>Create Service</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className={classes['sidebar-sub-menu']}>
                        <li className={classes['sidebar-sub-menu-title']}>
                            <h2>Resume</h2>
                            <img src='/icons/resumeIcon.png' alt="Resume Icon"/>
                        </li>
                        <li className={classes['sidebar-sub-menu-options']}>
                            <img src="/icons/myResumeIcon.png" alt="My Resume Icon"/>
                            <a>My Resume</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className={classes['sidebar-sub-menu']}>
                        <li className={classes['sidebar-sub-menu-title']}>
                            <h2>Report</h2>
                            <img src='/icons/warningIcon.png' alt="Report Icon"/>
                        </li>
                        <li className={classes['sidebar-sub-menu-options']}>
                            <img src='/icons/viewReportIcon.png' alt="View Report Icon"/>
                            <NavLink to="/viewreport">View Report</NavLink>
                        </li>
                        <li className={classes['sidebar-sub-menu-options']}>
                            <img src='/icons/submitReportIcon.png' alt="Submit Report Icon"/>
                            <NavLink to="/submitreport">Submit Report</NavLink>
                        </li>
                    </ul>
                </li>
                {isAdmin && (
                    <li>
                        <ul className={classes['sidebar-sub-menu']}>
                            <li className={classes['sidebar-sub-menu-title']}>
                                <h2>Admin Options</h2>
                                {/* Add admin-specific options */}
                            </li>
                            <li className={classes['sidebar-sub-menu-options']}>
                                <img src='/icons/submitReportIcon.png' alt="Submit Report Icon"/>
                                <NavLink to="/registration">Create Admin</NavLink>
                            </li>
                        </ul>
                    </li>
                )}
            </ul>
            {/*<div className={classes['sidebar-menu']}>*/}
            {/*    <img src="/icons/homeIcon.png" alt='Home Icon'/>*/}
            {/*    <p>Home</p>*/}
            {/*</div>*/}
            {/*<div className={classes['sidebar-menu']}>*/}
            {/*    <img src="/icons/serviceIcon.png" alt='Home Icon'/>*/}
            {/*    <p>Service</p>*/}
            {/*</div>*/}
            {/*<div className={classes['sidebar-menu']}>*/}
            {/*    <img src="/icons/resumeIcon.png" alt='Home Icon'/>*/}
            {/*    <p>Resume</p>*/}
            {/*</div>*/}
            {/*<div className={classes['sidebar-menu']}>*/}
            {/*    <img src="/icons/warningIcon.png" alt='Home Icon'/>*/}
            {/*    <p>Report</p>*/}
            {/*</div>*/}
        </aside>
    )
}