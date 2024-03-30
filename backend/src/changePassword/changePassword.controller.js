import {getUserModelByUsername, updateUserModelPasswordByUserName } from "../user/userModel.js";

export async function changePW(req, res) {
    try {
        console.log(req.body)
        const { username,password, newPassword} = req.body
        const user = await getUserModelByUsername(username)
        console.log(user)
        if (user) {
            console.log("User exist")
            const newPW = await updateUserModelPasswordByUserName(username, newPassword)
            res.status(200).json({ success: "User Password is Updated" });
        } else {       
            res.status(401).json({ error: "Username does not exists" });
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}