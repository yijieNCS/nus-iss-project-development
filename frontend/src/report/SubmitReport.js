import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import classes from './SubmitReport.module.css';
import { useState, useRef ,useEffect} from 'react';
import axios from "axios";


const SubmitReport = () => {
    const serverUrl =  process.env.REACT_APP_SERVER_URL
    const reportedUserRef = useRef()
    const reportRef = useRef()
    
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
        const userId = JSON.parse(sessionStorage.getItem('userData')).userId;
        console.log(userId)
        if (userId) {
            fetchUserInfo(userId);
            fetchReportedUsers(userId);
        }
    }, []);

    const fetchUserInfo = async (userId) => {
        try {
            const userData = await axios.get(`${serverUrl}/api/user/${userId}`);
            setReportBy(userData.data.username);
            setFormData(prevState => ({
                ...prevState,
                reportBy: userId
            }));
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    const fetchReportedUsers = async (userId) => {
        try {
            const response = await axios.get(`${serverUrl}/api/userexcept/${userId}`);
            setReportedUsers(response.data);
        } catch (error) {
            console.error('Error fetching reported users:', error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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
                const response = await axios.post(`${serverUrl}/api/report`, formData);
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
                    <h3><label htmlFor="report">Report Description:</label></h3>
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