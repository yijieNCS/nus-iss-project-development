import React, {useContext, useEffect, useState} from "react"
import { Header } from "../common/header/Header";
import Cardlist from "../resume/card/cardlist";
import { SideBar } from "../common/sidebar/SideBar";
// import classes from "../services/Services.module.css";
import GenInfo from "./GenInfo/geninfo";
import classes from "./Resume.module.css";
import axios from "axios";
import { Modal, Input,Form} from 'antd';

const Resume = () => {
  const [services, setServices] = useState([]);
  const [openPopup,setOpenPopup] = useState(false)
  const [isEdit,setisEdit] = useState(false)
  const [curServiceId, setCurServiceId] = useState(null)
  const [form] = Form.useForm();

    const [users, setUser] = useState([]);

    const getUser = async () => {//display current user info
      try {
        const userData1 = JSON.parse(sessionStorage.getItem('userData'))
        const usersData = await axios.get(`http://localhost:8080/api/user/${userData1.userId}`);
        
        console.log(userData1);
        
        setUser(usersData.data);
        
      } catch (error) {
        console.error('Error fetching the user: ', error);
      }
    }

    // query services from be
   

    const getServices = async () => {
      try {
        const sessionsData = await axios.get(`http://localhost:8080/api/services/`);
        setServices(sessionsData.data);
        
      } catch (error) {
        console.error('Error fetching the session: ', error);
      }
    }

    const deleteService = async (serviceId) => {
      try {
        await axios.delete(`http://localhost:8080/api/service/${serviceId}`);
        // Remove the deleted service from the list of services with this api
        const updatedServices = services.filter(service => service.serviceId !== serviceId);
        // Update the state with the updated list of services by removing specific service id from array
        setServices(updatedServices);
      } catch (error) {
        console.error('Error deleting service: ', error);
      }
    };

    // implement add services function
    // - if user press add service, show popup
    // - when user enter details
    // - pass details to be, query services from be again
    const addService = () => {
      setOpenPopup(true);
      setisEdit(false);
      console.log('open pop up');
      form.resetFields();
    }

    const closeEdit= () => {
      setOpenPopup(false);

    }

    const editService = (serviceId) => {
      // Find the service with the given serviceId
      setisEdit(true);
      setCurServiceId(serviceId);
      const serviceToEdit = services.find(service => service.serviceId === serviceId);
      if (serviceToEdit) {
        // Set the initial values of the form fields
        form.setFieldsValue({
          subject: serviceToEdit.subject,
          topic: serviceToEdit.topic,
          experience: serviceToEdit.experience,
          rate: serviceToEdit.rate
        });
        // Open the modal for editing
        setOpenPopup(true);
        console.log("test");
      }
    };

  const saveChanges = async () => {
  try {
    // Validate form fields
    const formValues = await form.validateFields();
    
    // Get userId from session data
    const userData1 = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData1.userId;

    // Append userId to form values
    const serviceData = {
      ...formValues,
      userId: userId
    };

    // Post service data to backend
    const saveService = await axios.post('http://localhost:8080/api/service', serviceData);
    
    // Close the modal
    setOpenPopup(false);

    // Fetch updated services
    getServices();
  } catch (error) {
    console.error('Error creating service: ', error);
  }
}

const saveEditChanges = async () => {
  try {
    // Validate form fields
    const formValues = await form.validateFields();
    
    // Get userId from session data
    const userData1 = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData1.userId;

    // Append userId to form values
    const serviceData = {
      ...formValues,
      userId: userId,
      serviceId: curServiceId
    };
    console.log(serviceData);

    // update service data to backend
    const saveEditService = await axios.put('http://localhost:8080/api/service/', serviceData);
    
    // Close the modal
    setOpenPopup(false);

    // Fetch updated services
    getServices();
  } catch (error) {
    console.error('Error creating service: ', error);
  }
}
    
  
    useEffect(() => {
      getUser();
      getServices();
    }, []);

    const formFields = [
      
      {
        name: 'subject',
        input: <Input />,
        label: 'Subject',
      },
      {
        name: 'topic',
        input: <Input />,
        label: 'Topic',
      },
      {
        name: 'experience',
        input: <Input />,
        label: 'Experience',
      },
      {
        name: 'rate',
        input: <Input />,
        label: 'Rate',
      },
    ]
   

    return (
      <div className={classes["grid-container"]}>
        <Header/>
        <SideBar/>
        
        <GenInfo 
        firstname={users.firstName}
        lastname={users.lastName}
        email={users.email} 
        education={users.education} 
        addService={addService}
        className="user-info-box"/>
       
        
        <Cardlist services={services} deleteService={deleteService} editService={editService} />
        <Modal open={openPopup} onCancel={closeEdit} onOk={isEdit ? saveEditChanges : saveChanges}>
          <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
            {formFields.map((props) => (
              <Form.Item {...props}>
                {props.input}
              </Form.Item>
            ))}
          </Form>
        </Modal>
              

      
       </div>
      
    ); 
  };

export default Resume;