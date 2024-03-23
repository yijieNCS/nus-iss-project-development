import { getUserModelByUsername } from "../user/userModel.js";

export async function login(req, res) {
    try {
        const { username, password } = req.body
        const user = await getUserModelByUsername(username)
        if (password === user.password) {
            console.log(user)
            res.status(200).json({
                success: "Login Successfully",
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}