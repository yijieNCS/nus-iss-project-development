import './Registration.css';
import { faUser, faEnvelope,faLock, faBirthdayCake,faTransgender, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Registration = () => {
    const navigate = useNavigate();

    const [formData,setFormData] = useState(
        {
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        password:'',
        reEnterPassword:'',
        bDay:"",
        gender:''
    }
    )

    const [Registered, setRegistered] = useState(false)

    useEffect(() => {
        if (Registered) {
            console.log("To Home Page")
        }
   }, [Registered])

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const userNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const reEnterPasswordRef = useRef()
    const genderRef = useRef()
    

    const handleCancel = () => {
        // Navigate to the login page
        navigate('/');
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

        if (!formData.lastName){
            newErrors.lastName = "Last name is required"
        }

        if (!formData.userName){
            newErrors.userName = "userName is required"
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

        if (!formData.bDay){
            newErrors.bDay = "birthday is required"
        }

        if (!formData.gender){
            newErrors.gender = "gender is required"
        }

        setErrors(newErrors)
        
        return Object.keys(newErrors).length === 0
    }

    const [errors, setErrors] = useState({})


    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log("hi")
        formData.firstName = firstNameRef.current.value
        formData.lastName = lastNameRef.current.value
        formData.userName = userNameRef.current.value
        formData.email = emailRef.current.value
        formData.password = passwordRef.current.value
        formData.reEnterPassword = reEnterPasswordRef.current.value
        // formData.month = monthRef.current.value
        // formData.day = dayRef.current.value
        // formData.year = yearRef.current.value
        formData.gender = genderRef.current.value

        const isValid = validateForm()
        if (isValid){
            try {
                const response = await axios.post('http://localhost:8080/api/register', formData);
                if (response.status === 200) {
                    setRegistered(true);
                    // Registration successful, navigate to another page or display a success message
                }
            } catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.error === 'User already exists') {
                    // User already exists, display an error message to the user
                    let newErrors={};
                    console.log('User already exists');
                    setErrors(newErrors.userName= "userName already exist")
                    // Handle the error in your UI (e.g., display an error message)
                } else {
                    // Other errors, log the error for debugging
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
        <main className="bgContainer">
            <div className="titleContainer">
                <FontAwesomeIcon icon={faLightbulb} size='5x' color='white' />
                <h1>SGLearner</h1>
                <h1>Registration</h1>
            </div>
            <form className="regForm" onSubmit={handleSubmit}>
                <div className="formContainer">
                    <div className="input-container">
                            <div className="input-icon">          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div className="divider"></div>
                                <input type="text" name="firstName" placeholder="firstName" ref={firstNameRef} value={formData.firstName} onChange={handleChange}/>
                                {errors.firstName && <div className="error">{errors.firstName}</div>}
                    </div>
                    <div className="input-container">
                            <div className="input-icon">          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div className="divider"></div>
                                <input type="text" name="lastName" placeholder="lastName" ref={lastNameRef} value={formData.lastName} onChange={handleChange}/>
                                {errors.lastName && <div className="error">{errors.lastName}</div>}
                    </div>
                    <div className="input-container">
                            <div className="input-icon">          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div className="divider"></div>
                                <input type="text" name="userName" placeholder="UserName" ref={userNameRef} value={formData.userName} onChange={handleChange}/>
                                {errors.userName && <div className="error">{errors.userName}</div>}
                    </div>
                    <div className="input-container">
                        <div className="input-icon">          
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                            <div className="divider"></div>
                            <input type="text" name="email" placeholder="Email" ref={emailRef} value={formData.email} onChange={handleChange}/>
                            {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="input-container">
                        <div className="input-icon">          
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                            <div className="divider"></div>
                            <input type="text" name="password" placeholder="Password" ref={passwordRef} value={formData.password} onChange={handleChange}/>
                            {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <div className="input-container">
                        <div className="input-icon">          
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                            <div className="divider"></div>
                            <input type="text" name="reEnterPassword" placeholder="Reenter Password" ref={reEnterPasswordRef} value={formData.reEnterPassword} onChange={handleChange}/>
                            {errors.reEnterPassword && <div className="error">{errors.reEnterPassword}</div>}
                    </div>

                    <div className="bdayContainer">
                        <div className="icContainer">
                            <FontAwesomeIcon icon={faBirthdayCake} />
                        </div>
                        <div className="inputGroup">
                            <input type="date" name="bDay" value={formData.bDay} onChange={handleChange}/>
                            {errors.bDay && <div className="error">{errors.bDay}</div>}
                        </div>
                        
                    </div>
  
                    <div className="genderContainer">
                        <div className="genderContainer-icon">
                            <FontAwesomeIcon icon={faTransgender} />
                        </div>
                        <div className="divider"></div>
                        <select name="gender" className="genderContainer-select" ref={genderRef} value={formData.gender} onChange={handleChange}>
                            <option disabled selected value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <div className="error">{errors.gender}</div>}
                    </div>
            
                </div>
                
                <div className="button-container">
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    <button className="register-button">Sign Up</button>
                </div>

            </form>
        </main>
        </>
       
     );
}
 
export default Registration;