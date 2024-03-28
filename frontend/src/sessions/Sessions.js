import React, {useCallback, useContext, useEffect, useState} from "react"
import classes from './Sessions.module.css'
import { ContentCard } from "./cards/ContentCard"
import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import axios from "axios";

function Sessions() {

    const [sessions, setSessions] = useState([])

    const getSessions = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'))
            const sessionsData
                = await axios.get(`http://localhost:8080/api/sessions/${userData['userId']}/${userData['username']}`)
            setSessions(sessionsData.data)
        } catch (error) {
            console.error('Error fetching the session: ', error)
        }
    }

    useEffect(() => {
        getSessions()
    }, []);

    return (
        <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <main className={classes.content}>
                {sessions.map(session => (
                    <ContentCard
                        key={session.sessionId}
                        firstName={session.firstName}
                        timing={session.date}
                        location={session.location}
                        status={session.status}
                    />
                ))}
            </main>
        </div>
    )
}

export default Sessions