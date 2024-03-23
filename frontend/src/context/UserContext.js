import React, { createContext, useState } from 'react'

const currentUser = {
    userId: 0,
    firstName: "",
    lastName: ""
}
const UserContext = createContext(currentUser)

export default UserContext
