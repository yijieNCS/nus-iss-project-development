import { pool } from "../app.js";

export async function getResumesModel() {
    const sql = `SELECT * FROM resume`
    try {
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error(pool.user)
        throw new Error("Failed to fetch resume from the database")
    }
}

export async function getResumeModel(resumeId) {
    const sql = `SELECT * FROM resume WHERE resumeId=?`
    try {
        const [rows] = await pool.query(sql, [resumeId])
        return rows[0];
    } catch (error) {
        throw new Error("Failed to fetch particular resume from the database")
    }

}

export async function createResumeModel(userId, years, name, types, description) {
    const sql = `INSERT INTO resume (userId, years, name, types, description)
                        VALUES(?, ?, ?, ?, ?)`
    try {
        const [result] = await pool.query(sql, [userId, years, name, types, description])
        return result.insertId
    } catch (error) {
        throw new Error("Failed to create the resume")
    }
}

export async function deleteResumeModel(resumeId) {
    const sql = `DELETE FROM resume WHERE resumeId=?`
    try {
        await pool.query(sql, [resumeId])
        return resumeId
    } catch (error) {
        throw new Error("Failed to delete the resume")
    }
}

// export async function updateResumeModel(resumeId, userId, years, name, types, description){
//     const sql = `UPDATE resume
//                         SET userId=?, years=?, name=?, types=?, description=?
//                         WHERE resumeId=?`
//     try {
//         const [result] = await pool.query(sql, [userId, years, name, types, description,resumeId])
//         return result.resumeId
//     } catch(error) {
//         if (error === "User not found"){
//             throw error
//         }else{
//             throw new Error("Failed to update the user")
//         }
//     }
// }

export async function updateResumeModel(resumeId, userId, years, name, types, description){
    const checkUserSql = `SELECT * FROM resume WHERE resumeId=?`;
    const sql = `UPDATE resume
                        SET userId=?, years=?, name=?, types=?, description=?
                        WHERE resumeId=?`
    try {
        const [userRows] = await pool.query(checkUserSql, [resumeId]);
        if (userRows.length === 0) {
            throw new Error("Resume not found");
        }
        const [result] = await pool.query(sql, [userId, years, name, types, description, resumeId])
        return resumeId
    } catch(error) {
        if (error === "Resume not found"){
            throw error
        }else{
            throw new Error("Failed to update the resume")
        }
       
    }
}