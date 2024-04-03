import { pool } from "../app.js";

export async function getSessionsModel() {
    const sql = `SELECT * FROM sessions`
    try {
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error(pool.user)
        throw new Error("Failed to fetch sessions from the database")
    }
}

export async function getSessionModel(sessionId) {
    const sql = `SELECT * FROM sessions WHERE sessionId=?`
    try {
        const [rows] = await pool.query(sql, [sessionId])
        return rows[0];
    } catch (error) {
        throw new Error("Failed to fetch particular session from the database")
    }
}

export async function getSessionsByUsernameAndUserIdModel(username, userId) {
    const sql =
        `SELECT 
        sessions.sessionId, sessions.timing, sessions.status, sessions.location, 
        users.firstName, users.lastname, users.gender
        FROM
        sessions left join users on (sessions.tutorId = users.userID or sessions.studentId = users.userID)
        WHERE (sessions.tutorId=? or sessions.studentId=?) AND users.username!=?`
    try {
        const [rows] = await pool.query(sql, [userId, userId, username])
        return rows
    } catch (error) {
        throw new Error("Failed to fetch user session information")
    }
}

export async function createSessionModel(tutorId, studentId, timing, status, location) {
    const sql = `INSERT INTO sessions (tutorId, studentId, timing, status, location)
                        VALUES(?, ?, ?, ?, ?)`
    try {
        const [result] = await pool.query(sql, [tutorId, studentId, timing, status, location])
        return result.insertId
    } catch (error) {
        throw new Error("Failed to create the session")
    }
}

export async function deleteSessionModel(sessionId) {
    const sql = `DELETE FROM sessions WHERE sessionId=?`
    try {
        await pool.query(sql, [sessionId])
        return sessionId
    } catch (error) {
        throw new Error("Failed to delete the session")
    }
}

export async function updateSessionModel(sessionId, tutorId, studentId, timing, status, location){
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