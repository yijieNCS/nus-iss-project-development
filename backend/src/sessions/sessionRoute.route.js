import express from "express"
import {
    getAllSessions,
    getAllSessionById,
    createSession,
    deleteSessionById,
    updateSessionById,
    getAllSessionsByUsernameAndUserId
} from "./sessionController.controller.js";

const sessionRouter = express.Router()

sessionRouter.get('/api/sessions', getAllSessions)

sessionRouter.get('/api/session/:id', getAllSessionById)

sessionRouter.post('/api/session', createSession)

sessionRouter.delete('/api/session/:id', deleteSessionById)

sessionRouter.put('/api/session', updateSessionById)

sessionRouter.get('/api/sessions/:userId/:username', getAllSessionsByUsernameAndUserId)

export default sessionRouter