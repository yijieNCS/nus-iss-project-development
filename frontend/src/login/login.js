import React, { useRef, useState, useEffect } from 'react'
import axios from "axios";
import './login.css'

const Login = () => {

    const [formData, setFormData] = useState ({
        username: '',
        password: ''
    })
    const [LoggedIn, setLoggedIn] = useState(false)

    const usernameRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
         if (LoggedIn) {
             console.log("To Home Page")
         }
    }, [LoggedIn])

    const handleSubmit = async (e) => {
        e.preventDefault()
        formData.username = usernameRef.current.value
        formData.password = passwordRef.current.value

        const response = await axios.post('http://localhost:8080/api/login', formData)
        if (response.status === 200) {
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
                <input
                    className="grid-username"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    ref={usernameRef}
                />
                <input
                    className="grid-password"
                    type="text"
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