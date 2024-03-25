import React, { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from "../context/UserContext";
import axios from "axios";
import classes from './changePassword.module.css'


const changePassword = () => {

    const [formData, setFormData] = useState ({
        username: '',
        password: '',
        newPassword:''
    })
    const [changePassword, setChangePassword] = useState(false)
    const navigate = useNavigate()

    const usernameRef = useRef()
    const passwordRef = useRef()
    const newPasswordRef = useRef()

    const userContext = useContext(UserContext)

    useEffect(() => {
         if (changePassword) {
             navigate("/sessions")
         }
    }, [changePassword, navigate])

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

    const handleChangePassword= () => {
        //TO DO Make a prompt ok to n b4 navigate Login


        navigate("/login")
    }

    const handleCancel= () => {
        //TO DO
        navigate("/login")
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
                <img className={classes["grid-password-icon"]} src="/PasswordIcon.png" alt="Password Icon"/>
                <input
                    className={classes["grid-password"]}
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    placeholder="Password"
                    ref={newPasswordRef}
                />
                <button className={classes["grid-cancel-button"]} onClick={handleCancel}>Cancel</button>
                <button className={classes["grid-changepassword-button"]} onClick={handleChangePassword}>Change Password</button>
            </form>
        </div>
     );
}
 
export default changePassword;