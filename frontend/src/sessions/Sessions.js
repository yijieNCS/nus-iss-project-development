import React, {useContext, useEffect, useState} from "react"
import classes from './Sessions.module.css'
import { ContentCard } from "./cards/ContentCard"
import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import axios from "axios";
import UserContext from "../context/UserContext"

function Sessions() {

    const [sessions, setSessions] = useState([])

    async function getSessions() {
        try {
            const sessionsData = await axios.get('http://localhost:8080/api/sessions')
            setSessions(sessionsData.data)
        } catch (error) {
            console.error('Error fetching the session: ', error)
        }
    }

    useEffect(() => {
        getSessions()
    }, []);

    useEffect(() => {
        console.log('The sessions:', sessions);
    }, [sessions])

    return (
        <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <main className={classes.content}>
                {sessions.map(session => (
                    <ContentCard
                        key={session.sessionId}
                        studentId={session.studentId}
                        timing={session.timing}
                        location={session.location}
                        status={session.status}
                    />
                ))}
            </main>
        </div>
    )
}

export default Sessions