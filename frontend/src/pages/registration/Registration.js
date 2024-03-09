import './Registration.css';
import { faUser, faEnvelope,faLock, faBirthdayCake,faTransgender, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        // Navigate to the login page
        navigate('/');
    };
    return ( 
        <>
        <main className="bgContainer">
            <div className="titleContainer">
                <FontAwesomeIcon icon={faLightbulb} size='5x' color='white' />
                <h1>SGLearner</h1>
                <h1>Registration</h1>
            </div>
            <form className="regForm" action="">
                <div className="formContainer">
                    <div class="input-container">
                            <div class="input-icon">          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div class="divider"></div>
                                <input type="text" name="firstName" placeholder="firstName" />
                    </div>
                    <div class="input-container">
                            <div class="input-icon">          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div class="divider"></div>
                                <input type="text" name="lastName" placeholder="lastName" />
                    </div>
                    <div class="input-container">
                            <div class="input-icon">          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div class="divider"></div>
                                <input type="text" name="userName" placeholder="UserName" />
                    </div>
                    <div class="input-container">
                        <div class="input-icon">          
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                            <div class="divider"></div>
                            <input type="text" name="email" placeholder="Email" />
                    </div>
                    <div class="input-container">
                        <div class="input-icon">          
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                            <div class="divider"></div>
                            <input type="text" name="password" placeholder="Password" />
                    </div>
                    <div class="input-container">
                        <div class="input-icon">          
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                            <div class="divider"></div>
                            <input type="text" name="reenterPassword" placeholder="Reenter Password" />
                    </div>
                    <div className="bdayContainer">
                        <div className="icContainer">
                            <FontAwesomeIcon icon={faBirthdayCake} />
                        </div>
                        <div className="inputGroup">
                            <input type="text" name="month" placeholder="Month" />
                            <input type="text" name="day" placeholder="Day" />
                            <input type="text" name="year" placeholder="Year" />
                        </div>
                        
                    </div>
  
                    <div className="genderContainer">
                        <div className="genderContainer-icon">
                            <FontAwesomeIcon icon={faTransgender} />
                        </div>
                        <div className="divider"></div>
                        <select name="gender" className="genderContainer-select">
                            <option disabled selected value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
            
                </div>
                
                <div class="button-container">
                    <button class="cancel-button" onClick={handleCancel}>Cancel</button>
                    <button class="register-button">Sign Up</button>
                </div>

            </form>
        </main>
        </>
       
     );
}
 
export default Registration;