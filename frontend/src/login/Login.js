import React, { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from "../context/UserContext";
import axios from "axios";
import './Login.css'

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
            setLoggedIn(true)
        }
    }

    return (
        <div className="grid-container">
            <img className="grid-icon" src="/SgLearnerIcon.png" alt="SGLearner Icon"/>
            <div className="grid-title">
                <h1>SGLearner</h1>
            </div>
            <form className="grid-form" onSubmit={handleSubmit}>
                <img className="grid-username-icon" src="/UsernameIcon.png" alt="Username Icon"/>
                <input
                    className="grid-username"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    ref={usernameRef}
                />
                <img className="grid-password-icon" src="/PasswordIcon.png" alt="Password Icon"/>
                <input
                    className="grid-password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <a className="grid-forgotten-password" href="#">Forgotten Password</a>
                <button className="grid-login-button" type="submit">Login</button>
                <button className="grid-register-button">Register</button>
            </form>
        </div>
    )
}

export default Login;