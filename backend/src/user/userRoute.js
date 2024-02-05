import express from "express"
import {
    getAllUsers,
    getAllUserById,
    createUser,
    deleteUserById,
    updateUserById
} from "./userController.js";

const userRouter = express.Router()

userRouter.get('/api/users', getAllUsers)

userRouter.get('/api/user/:id', getAllUserById)

userRouter.post('/api/user', createUser)

userRouter.delete('/api/user/:id', deleteUserById)

userRouter.put('/api/user', updateUserById)

export default userRouter