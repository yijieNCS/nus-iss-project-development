import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import classes from './SubmitReport.module.css';
import { useState, useRef ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext } from 'react';
import UserContext from "../context/UserContext";


const SubmitReport = () => {
    const reportedUserRef = useRef()
    const reportRef = useRef()
    
    const userContext = useContext(UserContext);
    const userId = userContext.userId;

    const [reportBy, setReportBy] = useState([])
    const [reportedUsers, setReportedUsers] = useState([])
    const [reported, setReported] = useState(false)
    const [errors, setErrors] = useState({})
    const [alertVisible, setAlertVisible] = useState(false)
    
    const [formData,setFormData] = useState(
        {
        report:'',
        reportedUser:'',
        reportBy:''
        }
    )
    useEffect(() => {
        // Fetch user's information when the component mounts
        async function fetchUserInfo() {
            try {
                console.log("userId: "+ userId)
                const userData = await axios.get(`http://localhost:8080/api/user/${userId}`); 
                setReportBy(userData.data.username); // Set reported user's name
                setFormData(prevState => ({
                    ...prevState,
                    reportBy: userId
                }));
                /*This code uses the functional form of setState, where you get the previous state (prevState) as an argument and return the updated state object. The spread operator (...prevState) clones all the fields from the previous state, and then we update the reportBy field with the new value (userId). */
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        }

        if (userId) {
            fetchUserInfo();
        }
    },[userId]);


    useEffect(() => {
        async function fetchReportedUsers() {
            try {
                const response = await axios.get(`http://localhost:8080/api/userexcept/${userId}`);
                setReportedUsers(response.data);
            } catch (error) {
                console.error('Error fetching reported users:', error);
            }
        }

        if (userId) {
            fetchReportedUsers();
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () =>{
        let newErrors ={}

        if (!formData.reportedUser){
            newErrors.reportedUser = "ReportedUser is required"
        }else if (formData.reportedUser==="Report User"){
            newErrors.reportedUser = "Please select an option"
        }

        if (!formData.report){
            newErrors.report = "Report is required"
        }

        setErrors(newErrors)
        
        return Object.keys(newErrors).length === 0
    }

    const handleOkClick = () => {
        setAlertVisible(false);
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log("enter submit report")
        formData.reportedUser = reportedUserRef.current.value
        formData.report = reportRef.current.value

        const isValid = validateForm()
        if (isValid){
            try {
                const response = await axios.post('http://localhost:8080/api/report', formData);
                if (response.status === 200) {
                    setReported(true)
                    setAlertVisible(true)
                }
            } catch (error) {       
                    console.error('Fail Create Report error:', error.message);
                    // Handle the error in your UI (e.g., display a generic error message)              
            }   
        }else{
            console.log("Form Validation Failed")
        }
    }



    return ( 
        <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <form className={classes["content"]} onSubmit={handleSubmit}>
              <div className={classes["reportcontainer"]}>
                <h2 className={classes["titlereport"]}>
                    Reported by {reportBy}
                </h2>
                <div className={classes["reporteduserOverallContainer"]}>
                    <div className={classes["reporteduserContainer"]}>
                            <div >
                                <img src='/icons/warningIcon.png' alt="Report Icon"/>
                            </div>
                            <div className={classes["divider"]}></div>
                            <select name="reportedUser" className={classes["reporteduserContainer-select"]} ref={reportedUserRef} value={formData.reportedUser} onChange={handleChange} >
                                <option selected value="">Report User</option>
                                {reportedUsers.map(user => (
                                    <option key={user.userId} value={user.userId}>{user.username}</option>
                                ))}
                            </select>         
                    </div>
                    {errors.reportedUser && <div className={classes["error"]}>{errors.reportedUser}</div>}                
                </div>    
                    
                <div className={classes["reportdescContainer"]}>
                    <h3><label for="report">Report Description:</label></h3>
                    <textarea id="report" name="report" ref={reportRef} value={formData.report} onChange={handleChange}></textarea>
                    {errors.report && <div className={classes["error"]}>{errors.report}</div>}
                </div> 
                <div className={classes["button-container"]}>
                    <button className={classes["submit-button"]}>Submit</button>
                </div>
              </div>
            </form>
            {alertVisible && (
                <div className={classes.alert}>
                    <p>User reported successfully!</p>
                    <button className={classes.okButton} onClick={handleOkClick}>OK</button>
                </div>
            )}
        </div>
     );
}

export default SubmitReport;