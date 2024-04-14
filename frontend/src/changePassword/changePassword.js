import React, { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import classes from './changePassword.module.css'


const ChangePassword = () => {

    const serverUrl= process.env.REACT_APP_SERVER_URL
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

    const [errors, setErrors] = useState({})
    //TO DO errors UI (done)
    //check whether useref needed or handlechange is better

    useEffect(() => {
         if (changePassword) {
             navigate("/")
         }
    }, [changePassword, navigate])

    const validateForm =()=>{
        let newErrors ={}

        if (!formData.username){
            newErrors.username = "username is required"
        }
        if (!formData.password){
            newErrors.password = "password is required"
        }

        if (!formData.newPassword){
            newErrors.newPassword = "password is required"
        }else if(formData.newPassword === formData.password){
            newErrors.newPassword = "new password entered must be different from password"
        }
        setErrors(newErrors)
        
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        formData.username = usernameRef.current.value
        formData.password = passwordRef.current.value
        formData.newPassword = newPasswordRef.current.value

        const isValid = validateForm()
        if (isValid){
            try {
                const response = await axios.post(`${serverUrl}/api/changepassword`, formData);
                if (response.status === 200) {
                    setChangePassword(true);
                }
            } catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.error === 'Username does not exists') {
                    let newErrors={};
                    console.log('Username does not exists');
                    setErrors(newErrors.username= "Username does not exists")
                } else {
                    console.error('error:', error.message);
                }
            }   
        }else{
            console.log("Form Validation Failed")
        }
    }

    const handleCancel= () => {
        navigate("/")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };
    
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
                    onChange={handleChange}
                />
                {errors.username && <div className={classes["error-username"]}>{errors.username}</div>}
                <img className={classes["grid-password-icon"]} src="/PasswordIcon.png" alt="Password Icon"/>
                <input
                    className={classes["grid-password"]}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    ref={passwordRef}
                    onChange={handleChange}
                />
                {errors.password && <div className={classes["error-password"]}>{errors.password}</div>}
                <img className={classes["grid-new-password-icon"]} src="/PasswordIcon.png" alt="Password Icon"/>
                <input
                    className={classes["grid-new-password"]}
                    type="password"
                    id="newpassword"
                    name="newPassword"
                    placeholder="NewPassword"
                    ref={newPasswordRef}
                    onChange={handleChange}
                />
                {errors.newPassword && <div className={classes["error-newpassword"]}>{errors.newPassword}</div>}
                <button className={classes["grid-cancel-button"]} onClick={handleCancel}>Cancel</button>
                <button className={classes["grid-changepassword-button"]}>Change Password</button>
            </form>
        </div>
     );
}
 
export default ChangePassword;