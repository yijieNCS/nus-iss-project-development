import React, { useState } from "react";
import classes from './geninfo.module.css';
import axios from "axios";

const Geninfo = ({ firstname: initialFirstname, education: initialEducation, email: initialEmail, lastname: initialLastname }) => {
    // State variables to manage the values of input fields
    const [firstname, setFirstname] = useState(initialFirstname);
    const [lastname, setLastname] = useState(initialLastname);
    const [education, setEducation] = useState(initialEducation);
    const [email, setEmail] = useState(initialEmail);
    
    // State variable to manage edit mode
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        // Toggle edit mode
        setEditMode(!editMode);
        console.log(firstname);
        console.log(firstname);

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

    const saveChanges = () => {
        // You can implement logic to save changes here
        console.log("Saving changes...");
        console.log("Firstname:", firstname);
        console.log("Lastname:", lastname);
        console.log("Education:", education);
        console.log("Email:", email);
        toggleEditMode(); // Exit edit mode after saving changes
    };

    return (
        <div className={classes["user-info-box"] } >
            <div className={classes["centered"]}>
                <h2>General Information</h2>
                
                <label>First Name: </label>
                <input 
                    type="text" 
                    name="firstname" 
                    value={firstname} 
                    onChange={handleInputChange} 
                    disabled={!editMode}
                />
                
                <br />
                <label>Last Name: </label>
                <input 
                    type="text" 
                    name="lastname" 
                    value={lastname} 
                    onChange={handleInputChange} 
                    disabled={!editMode}
                />
                <br />
                <label>Education: </label>
                <input 
                    type="text" 
                    name="education" 
                    value={education} 
                    
                    onChange={handleInputChange} 
                    disabled={!editMode}
                />
                <br />
                <label>Email: </label>
                <input 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={handleInputChange} 
                    disabled={!editMode}
                />
                <br />
            </div>
            <div className={classes["addsvc-button"]}>
                <button onClick={() => console.log("add service")}>Add Service</button>
            </div>
            <div className={classes["edit-button"]}>
                <button onClick={toggleEditMode}>{editMode ? 'Cancel' : 'Edit'}</button>
            </div>
        </div>
    );
};

export default Geninfo;
