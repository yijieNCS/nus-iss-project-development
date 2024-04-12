import {
    getUsersModel,
    getUserModel,
    createUserModel,
    deleteUserModel,
    updateUserModel, getnonAdminUserModelExcept, deleteUserModelbyUsername
} from "./userModel.js";

export async function getAllUsers(req, res)  {
    try{
        const users = await getUsersModel()
        res.send(users)
    } catch(error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function getAllUserById(req, res){
    try{
        const id =req.params.id
        const user = await getUserModel(id)
        res.send(user)
    } catch(error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}


export async function getAllUserExceptById(req, res){
    try{
        const id =req.params.id
        const user = await getnonAdminUserModelExcept(id)
        res.send(user)
    } catch(error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function createUser(req, res) {
    try {
        const {  age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender,admin} = req.body
        const userId = await createUserModel(
            age,
            dateJoined,
            firstName,
            lastName,
            email,
            education,
            username,
            password,
            birthDate,
            gender,
            admin
        )
        res.status(200).send(`User Id: ${userId} is created Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function deleteUserById(req, res) {
    try {
        const id = req.params.id
        const userId = await deleteUserModel(id)
        res.status(200).send(`User Id: ${userId} is deleted Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function deleteUserByUsername(req, res) {
    try {
        const usernameparam = req.params.username
        console.log("usernameparam: "+usernameparam)
        const username = await deleteUserModelbyUsername(usernameparam)
        res.status(200).send(`Username: ${username} is deleted Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function updateUserById(req, res) {
    try {
        const { userId, firstName, lastName, email, education} = req.body
        const userIdRes = await updateUserModel(
            userId,
            firstName,
            lastName,
            email,
            education
           
        )
        res.status(200).send(`User Id: ${userIdRes} is updated Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}



export async function getCurrentUser(req, res, next) {
    next()
}