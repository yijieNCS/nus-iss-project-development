import express from "express"
import { getSessionBySessionId,
        getSessions,
        createSession,
        deleteSessionBySessionId,
        updateSessionBySessionId
} from "./session-model.js";

const sessionRouter = express.Router()

sessionRouter.get('/api/sessions', async (req, res) => {
    try {
        const sessions = await getSessions()
        res.send(sessions)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

sessionRouter.get('/api/session/:id', async (req, res) => {
    try {
        const id = req.params.id
        const session = await getSessionBySessionId(id)
        res.send(session)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

sessionRouter.post('/api/session', async (req, res ) => {
    try {
        const { tutorId, studentId, timing, status, location } = req.body
        const sessionId = await createSession(
            tutorId,
            studentId,
            timing,
            status,
            location
        )
        res.status(200).send(`Session Id: ${sessionId} is created Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

sessionRouter.delete('/api/session/:id', async (req, res) => {
    try {
        const id = req.params.id
        const sessionId = await deleteSessionBySessionId(id)
        res.status(200).send(`Session Id: ${sessionId} is deleted Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

sessionRouter.put('/api/session', async(req, res) => {
    try {
        const { sessionId, tutorId, studentId, timing, status, location } = req.body
        const sessionIdRes = await updateSessionBySessionId(
            sessionId,
            tutorId,
            studentId,
            timing,
            status,
            location
        )
        res.status(200).send(`Session Id: ${sessionIdRes} is updated Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

export default sessionRouter