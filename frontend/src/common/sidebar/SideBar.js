import React from 'react'
import classes from './SideBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SideBar() {
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
                            <a>Upcoming Sessions</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className={classes['sidebar-sub-menu']}>
                        <li>Services</li>
                        <li>Book Appointment</li>
                        <li>Create Service</li>
                    </ul>
                </li>
                <li>
                    <ul className={classes['sidebar-sub-menu']}>
                        <li>Resume</li>
                        <li>My Resume</li>
                    </ul>
                </li>
                <li>
                    <ul className={classes['sidebar-sub-menu']}>
                        <li>Report</li>
                        <li>View Report</li>
                        <li>Submit Report</li>
                    </ul>
                </li>
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