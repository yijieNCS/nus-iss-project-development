import {pool} from "../config/database.js";

export async function getSessions() {
    const [rows] = await pool.query(
        `SELECT * FROM sessions`
    );
    return rows;
}

export async function getSession(id) {
    const [rows] = await pool.query(
        `SELECT * 
        FROM sessions
        WHERE sessionId = ?`, [3]
    );
    return rows[0];
}

export async function createFunction(sessionId, tutorId, studentId, timing, status, location) {
    await pool.query(
        `INSERT INTO sessions (sessionId, tutorId, studentId, timing, status, location)
        VALUES(?, ?, ?, ?, ?, ?)`, [sessionId, tutorId, studentId, timing, status, location]
    )
}