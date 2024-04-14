// import './Registration.css';
import classes from './Registration.module.css';
import { faUser, faEnvelope,faLock, faBirthdayCake,faTransgender, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Registration = () => {
    const serverUrl =  process.env.REACT_APP_SERVER_URL
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false)
    const [formData,setFormData] = useState(
        {
        firstName:'',
        lastName:'',
        username:'',
        email:'',
        password:'',
        reEnterPassword:'',
        birthDate:"",
        gender:'',
        admin:''
    }
    )

    const [Registered, setRegistered] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [userExistVisible, setUserExistVisible] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('userData') !== null){
            const admin = JSON.parse(sessionStorage.getItem('userData')).admin;
            setIsAdmin(true)
            console.log("admin: "+admin) 
        }
        console.log("sessionStorage.getItem('userData'): "+sessionStorage.getItem('userData')) 
   }, [])

    useEffect(() => {
        if (Registered) {
            console.log("To Home Page")
        }
   }, [Registered])

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const reEnterPasswordRef = useRef()
    const genderRef = useRef()
    const adminRef = useRef()
    const birthDateRef = useRef()
    

    const handleCancel = () => {
        if (isAdmin){
            navigate('/viewreport')
        }
        else{
            // Navigate to the login page
            navigate('/');
        }
        
    };

    const isValidEmail = (email) => {
        // Regular expression for validating email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear email error when user modifies the email field
        // if (name === 'email') {
        //     setErrors({ ...errors, email: '' });
        // }
    };


    const validateForm = () =>{
        let newErrors ={}

        if (!formData.firstName){
            newErrors.firstName = "First name is required"
        }

        if (!isAdmin && !formData.lastName){
            newErrors.lastName = "Last name is required"
        }

        if (!formData.username){
            newErrors.username = "username is required"
        }

        if (!formData.email){
            newErrors.email = "email is required"
        }else if(!isValidEmail(formData.email)){
            newErrors.email = "Invalid email format"
        }

        if (!formData.password){
            newErrors.password = "password is required"
        }

        if (!formData.reEnterPassword){
            newErrors.reEnterPassword = "password is required"
        }else if(formData.password !==formData.reEnterPassword){
            newErrors.reEnterPassword = "reEnterPassword entered must be same as password"
        }

        if (!isAdmin && !formData.birthDate){
            newErrors.birthDate = "birthday is required"
        }

        if (!isAdmin && !formData.gender){
            newErrors.gender = "gender is required"
        }


        setErrors(newErrors)
        
        return Object.keys(newErrors).length === 0
    }

    const [errors, setErrors] = useState({})

    const handleOkClick = () => {
        setAlertVisible(false);
    }

    const handleUserOkClick =()=>{
        setUserExistVisible(false);
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log("hi")
        formData.firstName = firstNameRef.current.value
        formData.lastName = lastNameRef.current.value
        formData.username = usernameRef.current.value
        formData.email = emailRef.current.value
        formData.password = passwordRef.current.value
        formData.reEnterPassword = reEnterPasswordRef.current.value
        formData.birthDate = birthDateRef.current.value
        formData.gender = genderRef.current.value
         
        if (isAdmin){
            formData.admin = true
        }else{
            formData.admin = false
            
        }
        

        const isValid = validateForm()
        if (isValid){
            try {
                const response = await axios.post(`${serverUrl}/api/register`, formData);
                if (response.status === 200) {
                    setRegistered(true)
                    setAlertVisible(true)
                    // Registration successful, navigate to another page or display a success message
                }
            } catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.error === 'User already exists') {
                    let newErrors={};
                    console.log('User already exists');
                    setErrors(newErrors.username= "username already exist")
                    setUserExistVisible(true)
                } else {
                    console.error('Registration error:', error.message);
                    // Handle the error in your UI (e.g., display a generic error message)
                }
            }   
        }else{
            console.log("Form Validation Failed")
        }
    }
    return ( 
        <>     
        <main className={classes["bgContainer"]}>
            <div className={classes["titleContainer"]}>
                <FontAwesomeIcon icon={faLightbulb} size='5x' color='white' />
                <h1>SGLearner</h1>
                <h1>Registration</h1>
            </div>
            <form className={classes["regForm"]} onSubmit={handleSubmit}>
                <div className={classes["formContainer"]}>
                    <div className={classes["input-container"]}>
                            <div className={classes["input-icon"]}>          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div className={classes["divider"]}></div>
                                <input type="text" name="firstName" placeholder="firstName" ref={firstNameRef} value={formData.firstName} onChange={handleChange}/>
                                {errors.firstName && <div className={classes["error"]}>{errors.firstName}</div>}
                    </div>
                    <div className={classes["input-container"]}>
                            <div className={classes["input-icon"]}>          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div className={classes["divider"]}></div>
                                <input type="text" name="lastName" placeholder={isAdmin?"lastName (not needed)":"lastName"}ref={lastNameRef} value={!isAdmin ? null: formData.lastName} onChange={handleChange} readOnly={isAdmin} />
                                {!isAdmin &&  errors.lastName && <div className={classes["error"]}>{errors.lastName}</div>}
                    </div>
                    <div className={classes["input-container"]}>
                            <div className={classes["input-icon"]}>          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div className={classes["divider"]}></div>
                                <input type="text" name="username" placeholder="Username" ref={usernameRef} value={formData.username} onChange={handleChange}/>
                                {errors.username && <div className={classes["error"]}>{errors.username}</div>}
                    </div>
                    <div className={classes["input-container"]}>
                        <div className={classes["input-icon"]}>          
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                            <div className={classes["divider"]}></div>
                            <input type="text" name="email" placeholder="Email" ref={emailRef} value={formData.email} onChange={handleChange}/>
                            {errors.email && <div className={classes["error"]}>{errors.email}</div>}
                    </div>
                    <div className={classes["input-container"]}>
                        <div className={classes["input-icon"]}>          
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                            <div className={classes["divider"]}></div>
                            <input type="password" name="password" placeholder="Password" ref={passwordRef} value={formData.password} onChange={handleChange}/>
                            {errors.password && <div className={classes["error"]}>{errors.password}</div>}
                    </div>
                    <div className={classes["input-container"]}>
                        <div className={classes["input-icon"]}>          
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                            <div className={classes["divider"]}></div>
                            <input type="password" name="reEnterPassword" placeholder="Reenter Password" ref={reEnterPasswordRef} value={formData.reEnterPassword} onChange={handleChange}/>
                            {errors.reEnterPassword && <div className={classes["error"]}>{errors.reEnterPassword}</div>}
                    </div>

                    <div className={classes["bdayContainer"]}>
                        <div className={classes["icContainer"]}>
                            <FontAwesomeIcon icon={faBirthdayCake} />
                        </div>
                        <div className={classes["inputGroup"]}>
                            <input type="date" name="birthDate" ref={birthDateRef} value={!isAdmin ? null:formData.birthDate} onChange={handleChange} readOnly={isAdmin}/>
                            
                        </div>
                        {!isAdmin && errors.birthDate && <div className={classes["error"]}>{errors.birthDate}</div>}
                    </div>
  
                    <div className={classes["genderContainer"]}>
                        <div className={classes["genderContainer-icon"]}>
                            <FontAwesomeIcon icon={faTransgender} />
                        </div>
                        <div className={classes["divider"]}></div>
                        <select name="gender" className={classes["genderContainer-select"]} ref={genderRef} value={!isAdmin ? null:formData.gender} onChange={handleChange} disabled={isAdmin}>
                            <option selected value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {!isAdmin &&  errors.gender && <div className={classes["gendererror"]}>{errors.gender}</div>}
                    </div>
                    
                    {isAdmin && (<div className={classes["input-container"]}>
                            <div className={classes["input-icon"]}>          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div className={classes["divider"]}></div>
                                <input type="text" name="admin" placeholder="admin" ref={adminRef} readOnly={true} value="Admin User: true" onChange={handleChange}/>
                    </div>)
                    }

                </div>
                
                <div className={classes["button-container"]}>
                    <button className={classes["cancel-button"]} onClick={handleCancel}>Cancel</button>
                    <button className={classes["register-button"]}>Sign Up</button>
                </div>

            </form>
            {alertVisible && (
                <div className={classes.alert}>
                    <p>User registered successfully!</p>
                    <button className={classes.okButton} onClick={handleOkClick}>OK</button>
                </div>
            )}
            {userExistVisible && (
                <div className={classes.alert}>
                    <p>User already Exist!</p>
                    <button className={classes.okButton} onClick={handleUserOkClick}>OK</button>
                </div>
            )}
        </main>
        </>
       
     );
}
 
export default Registration;