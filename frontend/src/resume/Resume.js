import React, {useContext, useEffect, useState} from "react"
import { Header } from "../common/header/Header";
import Cardlist from "../resume/card/cardlist";
import { SideBar } from "../common/sidebar/SideBar";
// import classes from "../services/Services.module.css";
import GenInfo from "./GenInfo/geninfo";
import classes from "./Resume.module.css";

const Resume = () => {

    const user = {
        name: "John Doe",
        education:"berkley",
        email:"john@example.com"
    };

    return (
      <div className={classes["grid-container"]}>
        <Header/>
        <SideBar/>
    
        <GenInfo user={user} className="user-info-box"/>
        
        <Cardlist/>
       </div>
      
    ); 
  };

export default Resume;