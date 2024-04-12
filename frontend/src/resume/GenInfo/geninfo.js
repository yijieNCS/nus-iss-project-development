import React, { useState, useEffect } from "react";
import classes from './geninfo.module.css';
import axios from "axios";

const Geninfo = ({ firstname: initialFirstname, education: initialEducation, email: initialEmail, lastname: initialLastname, addService }) => {
    // State variables to manage the values of input fields
    const [firstname, setFirstname] = useState(initialFirstname);
    const [lastname, setLastname] = useState(initialLastname);
    const [education, setEducation] = useState(initialEducation);
    const [email, setEmail] = useState(initialEmail);

    useEffect(() => {
        setFirstname(initialFirstname);
        setLastname(initialLastname);
        setEducation(initialEducation);
        setEmail(initialEmail);
    }, [initialFirstname, initialLastname, initialEducation, initialEmail]);
    
    // State variable to manage edit mode
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        // Toggle edit mode
        setEditMode(!editMode);
        console.log(editMode);
        if (editMode==true){
            saveChanges();
        }
        
    };
    

    const handleInputChange = (event) => {
        // Update state variables based on input changes
        const { name, value } = event.target;
        switch (name) {
            case 'firstname':
                setFirstname(value);
                break;
            case 'lastname':
                setLastname(value);
                break;
            case 'education':
                setEducation(value);
                break;
            case 'email':
                setEmail(value);
                break;
            default:
                break;
        }
    };


    const saveChanges = async() => {
        try {
            // PUT request to update user data
            const userData1 = JSON.parse(sessionStorage.getItem('userData'));
            const userId = userData1.userId;
            console.log(userId,firstname,lastname,education,email);
            await axios.put('http://localhost:8080/api/user/', {
                userId: userId,
                firstName: firstname,
                lastName: lastname,
                education: education,
                email: email
            });
           
            // Exit edit mode
            
        } catch (error) {
            console.error('Error updating user data: ', error);
        }
    };

    return (
        <div className={classes["user-info-box"]}>
            <div className={classes["centered"]}>
                <h2>General Information</h2>
                <label>First Name: </label>
                <input className={classes["inputinfo"]}
                    type="text" 
                    name="firstname" 
                    value={firstname} 
                    onChange={handleInputChange} 
                    disabled={!editMode}
                />
                <br />
                <label>Last Name: </label>
                <input className={classes["inputinfo"]}
                    type="text" 
                    name="lastname" 
                    value={lastname} 
                    onChange={handleInputChange} 
                    disabled={!editMode}
                />
                <br />
                <label>Education: </label>
                <input className={classes["inputinfo"]}
                    type="text" 
                    name="education" 
                    value={education} 
                    onChange={handleInputChange} 
                    disabled={!editMode}
                />
                <br />
                <label>Email: </label>
                <input className={classes["inputinfo"]}
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={handleInputChange} 
                    disabled={!editMode}
                />
                <br />
            </div>
            <div className={classes["addsvc-button"]}>
                <button onClick={addService}>Add Service</button>
            </div>
            <div className={classes["edit-button"]}>
                <button onClick={toggleEditMode}>{editMode ? 'Save' : 'Edit'}</button>
            </div>
        </div>
    );
};

export default Geninfo;
