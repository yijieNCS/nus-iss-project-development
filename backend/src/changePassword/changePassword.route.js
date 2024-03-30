import express from "express";
import { changePW } from "./changePassword.controller.js";

const changePWRouter = express.Router()

changePWRouter.post('/api/changepassword', changePW)

export default changePWRouter