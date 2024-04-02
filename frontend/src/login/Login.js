import React, { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate , NavLink} from 'react-router-dom'
import UserContext from "../context/UserContext";
import axios from "axios";
import classes from './Login.module.css'

const Login = () => {

    const [formData, setFormData] = useState ({
        username: '',
        password: ''
    })
    const [LoggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()

    const usernameRef = useRef()
    const passwordRef = useRef()

    const userContext = useContext(UserContext)

    useEffect(() => {
         if (LoggedIn) {
             navigate("/sessions")
         }
    }, [LoggedIn, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        formData.username = usernameRef.current.value
        formData.password = passwordRef.current.value

        const response = await axios.post('http://localhost:8080/api/login', formData)
        if (response.status === 200) {
            console.log(response)
            userContext.userId = response.data.userId
            userContext.firstName = response.data.firstName
            userContext.lastName = response.data.lastName
            console.log("userId at login: " +userContext.userId)
            setLoggedIn(true)
        }
    }

    const handleRegistration = () => {
        navigate("/registration")
    }

    return (
        <div className={classes['grid-container']}>
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