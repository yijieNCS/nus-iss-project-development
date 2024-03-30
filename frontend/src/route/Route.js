
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Login from "../login/Login";
import Sessions from "../sessions/Sessions";
import Services from "../services/Services";
import {UserProvider} from "../context/UserProvider";

function AppRoutes() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route exact path="/" element={<Login/>} />
                    <Route exact path="/sessions" element={<Sessions/>}/>
                    <Route exact path="/services" element={<Services/>}/>
                </Routes>
            </UserProvider>
        </Router>
    )
}

export default AppRoutes
