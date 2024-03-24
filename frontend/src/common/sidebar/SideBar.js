import React from 'react'
import classes from './SideBar.module.css'

export function SideBar() {
    return (
        <aside className={classes.sidebar}>
            <div className={classes['sidebar-title']}>
                <img className={classes['sidebar-icon']} src="/SgLearnerIcon.png" alt='SGLearner Icon'/>
                <h2 className={classes['sidebar-company-title']}>SGLearner</h2>
            </div>
            <div className={classes['sidebar-menu']}>
                <img src="/icons/homeIcon.png" alt='Home Icon'/>
                <p>Home</p>
            </div>
            <div className={classes['sidebar-menu']}>
                <img src="/icons/serviceIcon.png" alt='Home Icon'/>
                <p>Service</p>
            </div>
            <div className={classes['sidebar-menu']}>
                <img src="/icons/resumeIcon.png" alt='Home Icon'/>
                <p>Resume</p>
            </div>
            <div className={classes['sidebar-menu']}>
                <img src="/icons/warningIcon.png" alt='Home Icon'/>
                <p>Report</p>
            </div>
        </aside>
    )
}