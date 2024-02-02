import { pool } from "../app.js";

export async function getSessions() {
    const sql = `SELECT * FROM sessions`
    try {
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error(pool.user)
        throw new Error("Failed to fetch sessions from the database")
    }
}

export async function getSessionBySessionId(sessionId) {
    const sql = `SELECT * FROM sessions WHERE sessionId=?`
    try {
        const [rows] = await pool.query(sql, [sessionId])
        return rows[0];
    } catch (error) {
        throw new Error("Failed to fetch particular session from the database")
    }

}

export async function createSession(tutorId, studentId, timing, status, location) {
    const sql = `INSERT INTO sessions (tutorId, studentId, timing, status, location)
                        VALUES(?, ?, ?, ?, ?)`
    try {
        const [result] = await pool.query(sql, [tutorId, studentId, timing, status, location])
        return result.insertId
    } catch (error) {
        throw new Error("Failed to create the session")
    }
}

export async function deleteSessionBySessionId(sessionId) {
    const sql = `DELETE FROM sessions WHERE sessionId=?`
    try {
        await pool.query(sql, [sessionId])
        return sessionId
    } catch (error) {
        throw new Error("Failed to delete the session")
    }
}

export async function updateSessionBySessionId(sessionId, tutorId, studentId, timing, status, location){
    const sql = `UPDATE sessions
                        SET tutorId=?, studentId=?, timing=?, status=?, location=?
                        WHERE sessionId=?`
    try {
        const [result] = await pool.query(sql, [tutorId, studentId, timing, status, location, sessionId])
        return result.insertId
    } catch(error) {
        throw new Error("Failed to update the session")
    }
}