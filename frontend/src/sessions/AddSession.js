import React, {useCallback, useContext, useEffect, useState} from "react"
import classes from './AddSession.module.css'
import {SideBar} from "../common/sidebar/SideBar";
import {Header} from "../common/header/Header";
import {faUser, faBirthdayCake} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios"

const AddSession = () => {

    const [selectedDate, setSelectedDate] = useState(getTodayDate())
    const [selectedDuration, setSelectedDuration] = useState(1)
    const [location, setLocation] = useState('')

    const serviceInformation = useLocation()
    const navigate = useNavigate()
    const { serviceId, tutorName, rate, subject, topic, tutorId } = serviceInformation.state;
    const studentId = JSON.parse(sessionStorage.getItem('userData'))['userId']
    const serverUrl = process.env.REACT_APP_SERVER_URL

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    }

    function handleOptions(event) {
        setSelectedDuration(parseInt(event.target.value))
    }

    function handleSessionDate(event) {
        setSelectedDate(event.target.value)
    }

    function handleLocation(event) {
        setLocation(event.target.value)
    }

    const submitSession = async (e) => {
        e.preventDefault()
        const sessionData = {
            tutorId: tutorId,
            studentId: studentId,
            serviceId: serviceId,
            timing: selectedDate + " 00:00:00",
            status: "PENDING",
            location: location
        }

        try {
            const response = await axios.post(`${serverUrl}/api/session`, sessionData)
            if (response.status === 200) {
                navigate("/sessions")
            }
        } catch (error) {
            console.error('Error creating the session: ', error)
        }

    }

    return (
        <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <main className={classes.content}>
                <form className={classes["session-container"]} onSubmit={submitSession}>
                    <h2>Add Session</h2>
                    <div className={classes["readinput-container"]}>
                        <div className={classes["input-icon"]}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div className={classes["divider"]}></div>
                        <input type="text" name="tutor" value={tutorName} readOnly={true}
                               className={classes["input-container-input"]}/>
                    </div>

                    <div className={classes["readinput-container"]}>
                        <div className={classes["input-icon"]}>
                            <img src="/icons/statusIcon.png" alt="status Icon"/>
                        </div>
                        <div className={classes["divider"]}></div>
                        <input type="text" name="subject" value={subject} readOnly={true}
                               className={classes["input-container-input"]}/>
                    </div>

                    <div className={classes["readinput-container"]}>
                        <div className={classes["input-icon"]}>
                            <img src="/icons/locationIcon.png" alt="location Icon"/>
                        </div>
                        <div className={classes["divider"]}></div>
                        <input type="text" name="location" className={classes["input-container-input"]}
                            value={location} onChange={handleLocation}/>
                    </div>

                    <div className={classes["dateContainer"]}>
                        <div className={classes["icContainer"]}>
                            <img src="/icons/clockIcon.png" alt="clockIcon Icon"/>
                        </div>
                        <div className={classes["inputGroup"]}>
                            <input type="date" name="birthDate" value={selectedDate}
                                   min={getTodayDate()} onChange={handleSessionDate}/>
                        </div>
                    </div>

                    <div className={classes["input-container"]}>
                        <div className={classes["input-icon"]}>
                            <img src="/icons/clockIcon.png" alt="clockIcon Icon"/>
                        </div>
                        <div className={classes["divider"]}></div>
                        <select value={selectedDuration} onChange={handleOptions}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                    </div>

                    <div className={classes["readinput-container"]}>
                        <div className={classes["input-icon"]}>
                            <img src="/icons/statusIcon.png" alt="status Icon"/>
                        </div>
                        <div className={classes["divider"]}></div>
                        <input type="text" name="topic" value={topic} readOnly={true}
                               className={classes["input-container-input"]}/>
                    </div>

                    <div className={classes["input-container"]}>
                        <div className={classes["input-icon"]}>
                            <img src="/icons/statusIcon.png" alt="status Icon"/>
                        </div>
                        <div className={classes["divider"]}></div>
                        <input type="text" name="rate" value={`$${rate}`} readOnly={true}
                               className={classes["input-container-input"]}/>
                    </div>

                    <div className={classes["button-container"]}>
                        <button className={classes["submit-button"]}>Submit</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AddSession;