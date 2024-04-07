import { getUserModelByUsername, createUserModel } from "../user/userModel.js";
import { adminUserCreator, normalUserCreator } from "./registerFactory.factory.js";

export async function register(req, res) {
    try {

        const { firstName, lastName, username, email, password, bDay, gender, admin } = req.body
        const user = await getUserModelByUsername(username)

        let userData = undefined

        if (user) {
            res.status(400).json({ error: "User already exists" });
        } else {

            let education = "Unknown";

            if (admin === "Y") {
                userData = adminUserCreator({
                    firstName,
                    email,
                    username,
                    password
                })
            } else {
                userData = normalUserCreator({
                    firstName,
                    lastName,
                    email,
                    education,
                    username,
                    password,
                    bDay,
                    gender,
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