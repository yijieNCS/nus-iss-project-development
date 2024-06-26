import express from "express"
import {
    getAllUsers,
    getAllUsersAdminandNormalUser,
    getAllUserById,
    createUser,
    deleteUserById,
    updateUserById,
    deleteUserByUsername,
    getAllUserExceptById
} from "./userController.js";

const userRouter = express.Router()

userRouter.get('/api/users', getAllUsers)

userRouter.get('/api/adminandnormalusers', getAllUsersAdminandNormalUser)

userRouter.get('/api/user/:id', getAllUserById)

userRouter.get('/api/userexcept/:id', getAllUserExceptById)

userRouter.post('/api/user', createUser)

userRouter.delete('/api/user/:id', deleteUserById)

userRouter.delete('/api/username/:username', deleteUserByUsername)

userRouter.put('/api/user/', updateUserById)


export default userRouter