import React, { useState } from 'react';
import styles from './searchbar.module.css'; 

const SearchBar = ({ onSearch, onClear }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const searchBy = event.target.searchby.value; // This line is not needed
        onSearch(query, searchBy); // Pass query and searchBy directly to onSearch
    };

    const handleClear = () => {
        setQuery(''); // Clear the query input
        onClear(); // Call the onClear callback to reset search results
    };
   
    return (
        <form onSubmit={handleSubmit} className={styles["searchbar"]}>
            <div className={styles["formContainer"]}> 
                <select name="searchby" id="searchby">
                    <option value="subject">Subject</option>
                    <option value="topic">Topic</option>
                </select>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
                <button type="button" onClick={handleClear}>Clear</button>
            </div>
        </form>
    );
};

export default SearchBar;
