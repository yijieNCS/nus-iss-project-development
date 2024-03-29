import { updateUserModelPasswordByUserName } from "../user/userModel.js";

export async function changePW(req, res) {
    try {
        console.log(req.body)
        const { userName,password, newPassword} = req.body
        const user = await getUserModelByUsername(userName)

        if (user) {
            console.log("User exist")
            newPW = await updateUserModelPasswordByUserName(userName, newPassword)
            res.status(200).json({ success: "User Password is Updated" });
        } else {       
            res.status(400).json({ error: "Username does not exists" });
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}