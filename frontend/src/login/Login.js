import React, { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate , NavLink} from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { Modal } from "../common/modal/Modal";
import UserContext from "../context/UserContext";
import axios from "axios";
import classes from './Login.module.css'

const Login = () => {

    const [formData, setFormData] = useState ({
        username: '',
        password: ''
    })
    const [LoggedIn, setLoggedIn] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const closeModal = () => setIsModalOpen(false)

    const navigate = useNavigate()
    const serverUrl = process.env.REACT_APP_SERVER_URL
    console.log(`The server URL is ${serverUrl}`)

    const usernameRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
         if (LoggedIn) {
             navigate("/sessions")
         }
    }, [LoggedIn, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        formData.username = usernameRef.current.value
        formData.password = passwordRef.current.value

        try {
            const response = await axios.post(`${serverUrl}/api/login`, formData)
            if (response.status === 200) {
                sessionStorage.setItem('accessToken', response.data['accessToken'])
                const decodedData = jwtDecode(response.data['accessToken'])
                const user = {
                    userId: decodedData.userId,
                    username: decodedData.username,
                    admin: decodedData.admin
                }
                sessionStorage.setItem('userData', JSON.stringify(user))
                setLoggedIn(true)
            }
        } catch (e) {
            if (e.response && e.response.status === 401) {
                setErrorMsg(e.response.data['error'])
                setIsModalOpen(true)
            }
        }
    }

    const handleRegistration = () => {
        navigate("/registration")
    }

    return (
        <div className={classes['grid-container']}>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p>{errorMsg}</p>
            </Modal>
            <img className={classes["grid-icon"]} src="/SgLearnerIcon.png" alt="SGLearner Icon"/>
            <div className={classes["grid-title"]}>
                <h1>SGLearner</h1>
            </div>
            <form className={classes["grid-form"]} onSubmit={handleSubmit}>
                <img className={classes["grid-username-icon"]} src="/UsernameIcon.png" alt="Username Icon"/>
                <input
                    className={classes["grid-username"]}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    ref={usernameRef}
                />
                <img className={classes["grid-password-icon"]} src="/PasswordIcon.png" alt="Password Icon"/>
                <input
                    className={classes["grid-password"]}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <NavLink to="/changepassword" className={classes["grid-forgotten-password"]}>Forgotten Password</NavLink>
                <button className={classes["grid-login-button"]}>Login</button>
                <button className={classes["grid-register-button"]} onClick={handleRegistration}>Register</button>
            </form>
        </div>
    )
}

export default Login;