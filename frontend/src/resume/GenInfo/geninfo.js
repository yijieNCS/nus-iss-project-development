import React, { useState, useEffect } from "react";
import classes from './geninfo.module.css';
import axios from "axios";
import { Form, Input } from "antd";

const Geninfo = ({ firstname: initialFirstname, education: initialEducation, email: initialEmail, lastname: initialLastname, addService }) => {
    // State variables to manage the values of input fields
    const [form] = Form.useForm();

    const serverUrl = process.env.REACT_APP_SERVER_URL

    const formInitialValues = {
        firstName: initialFirstname,
        lastName: initialLastname,
        education: initialEducation,
        email: initialEmail,
    }

    useEffect(() => {
        form.setFieldsValue(formInitialValues);
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

    const saveChanges = async() => {
        try {
            // PUT request to update user data
            const userData1 = JSON.parse(sessionStorage.getItem('userData'));
            const userId = userData1.userId;
            const values = form.getFieldsValue();
            // console.log(userId,firstName,lastname,education,email);
            console.log('values', values);
            await axios.put(`${serverUrl}/api/user/`, {
                userId: userId,
                ...values,
                // firstName: firstname,
                // lastName: lastname,
                // education: education,
                // email: email
            });
           
            // Exit edit mode
            
        } catch (error) {
            console.error('Error updating user data: ', error);
        }
    };

    const formFields = [
        {
            name: 'firstName',
            label: 'First Name:',
            input: <Input />
        },
        {
            name: 'lastName',
            label: 'Last Name:',
            input: <Input />
        },
        {
            name: 'education',
            label: 'Education',
            input: <Input />
        },
        {
            name: 'email',
            label: 'Email:',
            input: <Input />
        },
    ]

    return (
        <div className={classes["user-info-box"]}>
            <div className={classes["centered"]}>
                <h2>General Information</h2>
                <Form
                    form={form}
                    disabled={!editMode}
                    labelCol={{ span: 8}}
                    wrapperCol={{ span: 16}}
                    initialValues={formInitialValues}
                >
                    {formFields.map((item) => (
                        <Form.Item {...item} style={{ marginBottom: '8px' }}>
                            {item.input}
                        </Form.Item>
                    ))}
                </Form>
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
