import express from 'express'
import dotenv from 'dotenv';
import router from './sessions/sessionRoute.route.js'
import userrouter from './user/userRoute.js'
import path from 'path'
import { fileURLToPath } from 'url';
import {connectDatabase} from "./config/database.js";

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFilePath = path.resolve(__dirname, '../../backend/.env');
const result = dotenv.config({path: envFilePath});

if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('Environment variables loaded successfully');
}

export const pool = connectDatabase()

const middleware = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
}

app.use(middleware)
app.use(express.json())
app.use(router)
app.use(userrouter)

app.listen(8080, () => {
    console.log('Server is running on port 8080...')
})

export default app