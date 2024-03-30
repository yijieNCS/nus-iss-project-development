import classes from './Services.module.css'
import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import CardList from '../services/card/cardlist';
import React, {useContext, useEffect, useState} from "react"



function Services() {


    return (
      <div className={classes["grid-container"]}>
        <Header/>
        <SideBar/>
        <CardList/>
      </div>
      
    ); 
  }

export default Services;