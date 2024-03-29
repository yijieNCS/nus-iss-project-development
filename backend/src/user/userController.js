import {
    getUsersModel,
    getUserModel,
    createUserModel,
    deleteUserModel,
    updateUserModel, getUserModelByUsername
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

export async function createUser(req, res) {
    try {
        const {  age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender} = req.body
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
            gender
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

export async function updateUserById(req, res) {
    try {
        const { userId, age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender} = req.body
        const userIdRes = await updateUserModel(
            userId,
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