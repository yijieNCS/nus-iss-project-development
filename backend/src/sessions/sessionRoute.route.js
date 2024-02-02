import express from "express"
import {
    getAllSessions,
    getAllSessionById,
    createSession,
    deleteSessionById,
    updateSessionById
} from "./sessionController.controller.js";

const sessionRouter = express.Router()

sessionRouter.get('/api/sessions', getAllSessions)

sessionRouter.get('/api/session/:id', getAllSessionById)

sessionRouter.post('/api/session', createSession)

sessionRouter.delete('/api/session/:id', deleteSessionById)

sessionRouter.put('/api/session', updateSessionById)

export default sessionRouter