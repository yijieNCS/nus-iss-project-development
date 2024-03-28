import React from "react"
import classes from './Header.module.css'

export function Header() {
    return (
        <header className={classes.header}>
            <h2 className={classes['header-current']}>Home</h2>
        </header>
    )
}