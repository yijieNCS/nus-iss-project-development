import { getUserModelByUsername, createUserModel } from "../user/userModel.js";

export async function register(req, res) {
    try {
        console.log(req.body)
        const { firstName, lastName, username, email, password, reEnterPassword, bDay, gender } = req.body
        const user = await getUserModelByUsername(username)

        console.log("username b4",username)
        if (user) {
            console.log("User exist")
            res.status(400).json({ error: "User already exists" });
        } else {
            console.log("bday: "+ bDay)
            // Calculate age test1 44
            const today = new Date();
            const birthDate = new Date(bDay);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            const admin ='N'
            let gen ='N'
            //gender
            if (gender === 'male'){
                gen = 'M'
            }else{
                gen = 'F'
            }

            // Placeholder later at other pages education can be set
            let education = "Unknown";
            console.log("age: ", age);
            console.log("firstName: ", firstName);
            console.log("lastName: ", lastName);
            console.log("email: ", email);
            console.log("ecucation: ", education);
            console.log("username: ", username);
            console.log("password: ", password);
            console.log("birthdate: ", birthDate);
            console.log("gender: ", gender);
            console.log("DATE: ", new Date());
            console.log("admin: ", admin);
            // If user does not exist, create the user datJoined is NOW() in sql
            await createUserModel(age, new Date(), firstName, lastName, email, education, username, password, birthDate, gen,admin);
            res.status(200).json({ success: "User registered successfully" });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}