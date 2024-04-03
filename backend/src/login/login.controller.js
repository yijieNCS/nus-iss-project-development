import jwt from 'jsonwebtoken';
import { getUserModelByUsername } from "../user/userModel.js";

export async function login(req, res) {
    try {
        const { username, password } = req.body
        const user = await getUserModelByUsername(username)

        if (!user) {
            res.status(401).json({
                error: "Username does not exist"
            })
        } else if (password === user.password) {
            const accessToken = jwt.sign({
                userId: user.userId,
                username: user.username
            }, process.env.JWT_SECRET, {expiresIn: '1h'})

            res.status(200).json({
                success: "Login Successfully",
                accessToken
            })
        } else {
            res.status(401).json({
                error: "Password is incorrect"
            })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

export async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split('')[1]

    if (token == null) {
        return res.status(401).json({
            error: "Authorization is not provided"
        })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403)
            } else {
                req.user = user
                next()
            }
        })
    }

}