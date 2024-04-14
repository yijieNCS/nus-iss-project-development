import React, {useState, useEffect} from 'react'
import classes from './SideBar.module.css'
import { NavLink } from 'react-router-dom'

export function SideBar() {

    const [isAdmin, setIsAdmin] = useState(false)

    const getUser = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'))
            console.log("admin " +userData.admin)
            if (userData.admin ===1){
                setIsAdmin(true)
            }else{
                setIsAdmin(false)
            }
            
        } catch (error) {
            console.error('Error fetching user: ', error)
        }
    }

    useEffect(() => {
        getUser()
    }, []);
    return (
        <aside className={classes.sidebar}>
            <div className={classes['sidebar-title']}>
                <img className={classes['sidebar-icon']} src="/SgLearnerIcon.png" alt='SGLearner Icon'/>
                <h2 className={classes['sidebar-company-title']}>SGLearner</h2>
            </div>
            <ul className={classes['sidebar-menu']}>
            {!isAdmin && (
            <>
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
                        <li className={classes['sidebar-sub-menu-options']}>
                            <img src="/icons/sessionsIcon.png" alt="Session Icon"/>
                            <NavLink to="/addsession">Add Session</NavLink>
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
                            <NavLink to ="/viewresume">My Resume</NavLink>
                            
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
                
                </>
                )}
                {isAdmin && (
                    <>
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
                            <li className={classes['sidebar-sub-menu-options']}>
                                <img src='/icons/submitReportIcon.png' alt="Submit Report Icon"/>
                                <NavLink to="/manageuser">Manage User</NavLink>
                            </li>
                        </ul>
                    </li>
                    </>
                    
                    )}
            </ul>
        </aside>
    )
}