import React, {useContext, useEffect, useState} from "react"
import { Header } from "../common/header/Header";
import Cardlist from "../resume/card/cardlist";
import { SideBar } from "../common/sidebar/SideBar";
// import classes from "../services/Services.module.css";
import GenInfo from "./GenInfo/geninfo";
import classes from "./Resume.module.css";
import axios from "axios";

const Resume = () => {



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


  
    useEffect(() => {
      getUser();
    }, []);

   

    return (
      <div className={classes["grid-container"]}>
        <Header/>
        <SideBar/>
        
        <GenInfo 
        firstname={users.firstName}
        lastname={users.lastName}
        email={users.email} 
        education={users.education} 
        className="user-info-box"/>
        
        <Cardlist/>
       </div>
      
    ); 
  };

export default Resume;