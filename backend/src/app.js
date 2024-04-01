import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import sessionRouter from './sessions/sessionRoute.route.js'
import resumeRouter from './resume/resumeRoute.route.js';
import serviceRouter from './service/service-routes.js';u
import userRouter from './user/userRoute.js';
import registerRouter from "./register/register.route.js";
import loginRouter from "./login/login.route.js";
import changePWRouter from "./changePassword/changePassword.route.js";
import path from 'path'
import { fileURLToPath } from 'url';
import {connectDatabase} from "./config/database.js";
import {generateSecretKey} from "./config/secret.js";

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFilePath = path.resolve(__dirname, '../../backend/.env');
const result = dotenv.config({path: envFilePath});

if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('Environment variables loaded successfully');
    process.env.JWT_SECRET = generateSecretKey()
}

export const pool = connectDatabase()

const middleware = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
}

app.use(cors({origin:true,credentials: true}));
app.use(middleware)
app.use(express.json())
app.use(middleware) 
app.use(userRouter)
app.use(sessionRouter)
app.use(resumeRouter)
app.use(serviceRouter)
app.use(registerRouter)
app.use(loginRouter)
app.use(changePWRouter)

app.listen(8080, () => {
    console.log('Server is running on port 8080...')
})

export default app