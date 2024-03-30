import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import classes from './Header.module.css'

export function Header() {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    const handleLogout = () => {
        sessionStorage.clear()
        navigate("/")
    }

    return (
        <header className={classes.header}>
            <h2 className={classes['header-current']}>Home</h2>
            <button className={classes['profile']} onClick={toggleModal}>
                <img src="/icons/profileIcon.png" alt="Profile Icon"/>
                {isOpen && (
                    <div className={classes['dropdown-container']}>
                        <div className={classes['dropdown-content']}>
                            <ul>
                                <li>Profile</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    </div>
                )}
            </button>
        </header>
    )
}