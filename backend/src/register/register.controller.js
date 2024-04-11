import { getUserModelByUsername, createUserModel } from "../user/userModel.js";
import { adminUserCreator, normalUserCreator } from "./registerFactory.factory.js";

export async function register(req, res) {
    try {
        console.log(req.body)
        const { firstName, lastName, username, email, password, birthDate, gender, admin } = req.body
        const user = await getUserModelByUsername(username)

        let userData = undefined

        if (user) {
            res.status(400).json({ error: "User already exists" });
        } else {

            let education = "Unknown";

            if (admin) {
                userData = adminUserCreator({
                    firstName,
                    email,
                    username,
                    password,
                    admin
                })
            } else {
                userData = normalUserCreator({
                    firstName,
                    lastName,
                    email,
                    education,
                    username,
                    password,
                    birthDate,
                    gender,
                    admin
                })
            }
            await createUserModel(userData)
            res.status(200).json({ success: "User registered successfully" });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}