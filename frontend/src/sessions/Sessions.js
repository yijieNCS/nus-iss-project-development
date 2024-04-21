import React, {useCallback, useContext, useEffect, useState} from "react"
import classes from './Sessions.module.css'
import { ContentCard } from "./cards/ContentCard"
import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import axios from "axios";

function Sessions() {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const [sessions, setSessions] = useState([])

    const getSessions = async () => {
        try {
            const userData = JSON.parse(sessionStorage.getItem('userData'))
            const sessionsData
                = await axios.get(`${serverUrl}/api/sessions/${userData['userId']}/${userData['username']}`)
            setSessions(sessionsData.data)
        } catch (error) {
            console.error('Error fetching the session: ', error)
        }
    }

    useEffect(() => {
        getSessions()
    }, []);

    const handleDelete = async (index, sessionId) => {
        const updatedSession = sessions.filter((_, i) => i !== index)
        setSessions(updatedSession)
        try {
            await axios.delete(`${serverUrl}/api/session/${sessionId}`)
        } catch (error) {
            console.error(`Error Deleting the session: `, error)
        }
    }

    return (
        <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <main className={classes.content}>
                {/*{sessions.map(session => (*/}
                {/*    <ContentCard*/}
                {/*        key={session.sessionId}*/}
                {/*        onDelete={() => handleDelete(session.sessionId)}*/}
                {/*        {...session}*/}
                {/*    />*/}
                {/*))}*/}
                {sessions.map((session, index) => (
                    <ContentCard
                        key={index} // Use the index as the key
                        onDelete={() => handleDelete(index, session.sessionId)}
                        {...session}
                    />
                ))}
            </main>
        </div>
    )
}

export default Sessions