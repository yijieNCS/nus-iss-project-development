import classes from './Services.module.css'
import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import CardList from '../services/card/cardlist';
import SearchBar from './searchbar/searchbar';
import React, {useContext, useEffect, useState} from "react"
import axios from 'axios';

function Services() {

  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search
  const handleSearch = async (query, searchby) => {
    try{ 
      let sessionsData;
      if (searchby === 'subject') {
        sessionsData = await axios.get(`http://localhost:8080/api/serviceSearchSubject/${query}`);
      } else if (searchby === 'topic') {
        sessionsData = await axios.get(`http://localhost:8080/api/serviceSearchTopic/${query}`);
      }
      setSearchResults(sessionsData.data);
    }
    catch (error) {
        console.error('Error fetching the service: ', error);
    } 
  };

  const handleClear = () => {
    setSearchResults([]); // Reset search results to an empty array
  };

    return (
      <div className={classes["grid-container"]}>
        <Header/>
        <SideBar/>
        <SearchBar onSearch={handleSearch} onClear={handleClear}/>
        <CardList searchData={searchResults}/>
      </div>
      
    ); 
  }

export default Services;