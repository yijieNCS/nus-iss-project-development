import { pool } from "../app.js";

export async function getReportsModel() {
    const sql = `SELECT * FROM report`
    try {
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error(pool.user)
        throw new Error("Failed to fetch reports from the database")
    }
}

export async function getReportModel(reportId) {
    const sql = `SELECT * FROM report WHERE reportId=?`
    try {
        const [rows] = await pool.query(sql, [reportId])
        return rows[0];
    } catch (error) {
        throw new Error("Failed to fetch particular report from the database")
    }
}

export async function createReportModel(report, reportedUser, reportBy) {
    const sql = `INSERT INTO report (report, reportedUser, reportBy)
                        VALUES(?, ?, ?)`
    try {
        const [result] = await pool.query(sql, [report, reportedUser, reportBy])
        return result.insertId
    } catch (error) {
        throw new Error("Failed to create the report")
    }
}

export async function deleteReportModel(reportId) {
    const sql = `DELETE FROM report WHERE reportId=?`
    try {
        await pool.query(sql, [reportId])
        return reportId
    } catch (error) {
        throw new Error("Failed to delete the report")
    }
}

export async function updateReportModel(reportId, report, reportedUser, reportBy){
    const sql = `UPDATE report
                        SET report=?, reportedUser=?, reportBy=?
                        WHERE reportId=?`
    try {
        const [result] = await pool.query(sql, [report, reportedUser, reportBy,reportId])
        return result.insertId
    } catch(error) {
        throw new Error("Failed to update the report")
    }
}