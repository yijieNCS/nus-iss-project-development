import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Login from "../login/Login";
import Sessions from "../sessions/Sessions";
import {UserProvider} from "../context/UserProvider";
import Registration from "../registration/Registration";

function AppRoutes() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route exact path="/" element={<Login/>} />
                    <Route exact path="/sessions" element={<Sessions/>}/>
                    <Route exact path="/registration" element={<Registration/>}/>
                </Routes>
            </UserProvider>
        </Router>
    )
}

export default AppRoutes