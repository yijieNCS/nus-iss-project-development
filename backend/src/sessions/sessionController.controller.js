import {
    getSessionsModel,
    getSessionModel,
    createSessionModel,
    deleteSessionModel,
    updateSessionModel
} from "./sessionModel.model.js";
import { Session } from "./sessionEntity.entity.js";

export async function getAllSessions(req, res) {
    try {
        const sessionsData = await getSessionsModel()
        const sessions = sessionsData.map(row => new Session(
            row.sessionId,
            row.tutorId,
            row.studentId,
            row.timing,
            row.status,
            row.location
        ))
        res.send(sessions)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function getAllSessionById(req, res) {
    try {
        const id = req.params.id
        const session = await getSessionModel(id)
        res.send(session)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function createSession(req, res) {
    try {
        const { tutorId, studentId, timing, status, location } = req.body
        const sessionId = await createSessionModel(
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
}

export async function deleteSessionById(req, res) {
    try {
        const id = req.params.id
        const sessionId = await deleteSessionModel(id)
        res.status(200).send(`Session Id: ${sessionId} is deleted Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function updateSessionById(req, res) {
    try {
        const { sessionId, tutorId, studentId, timing, status, location } = req.body
        const sessionIdRes = await updateSessionModel(
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
}