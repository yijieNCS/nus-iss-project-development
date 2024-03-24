import express from "express";
import { register } from "./register.controller.js";

const registerRouter = express.Router()

registerRouter.post('/api/register/', register)

export default registerRouter