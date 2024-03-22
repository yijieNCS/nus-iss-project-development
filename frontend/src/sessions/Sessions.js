import React, { useContext } from "react"
import UserContext from "../context/UserContext";

function Sessions() {

    console.log(useContext(UserContext))

    return (
        <h1>Sessions</h1>
    )
}

export default Sessions