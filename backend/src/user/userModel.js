import { pool } from "../app.js";

export async function getUsersModel() {
    const sql = `SELECT * FROM tbl_User`
    try {
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error(pool.user)
        throw new Error("Failed to fetch users from the database")
    }
}

export async function getUserModel(userId) {
    const sql = `SELECT * FROM tbl_user WHERE userId=?`
    try {
        const [rows] = await pool.query(sql, [userId])
        return rows[0];
    } catch (error) {
        throw new Error("Failed to fetch particular user from the database")
    }

}

export async function createUserModel(age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender) {
    const sql = `INSERT INTO tbl_user (age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    try {
        const [result] = await pool.query(sql, [age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender])
        return result.insertId
    } catch (error) {
        throw new Error("Failed to create the user")
    }
}

export async function deleteUserModel(userId) {
    const sql = `DELETE FROM tbl_user WHERE userId=?`
    try {
        await pool.query(sql, [userId])
        return userId
    } catch (error) {
        throw new Error("Failed to delete the user")
    }
}

export async function updateUserModel(userId, age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender){
    const sql = `UPDATE tbl_user
                        SET age=?, dateJoined=?, firstName=?, lastName=?, email=?, education=?, username=?, password=?, birthDate=?, gender=?
                        WHERE userId=?`
    try {
        const [result] = await pool.query(sql, [age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender])
        return result.insertId
    } catch(error) {
        throw new Error("Failed to update the user")
    }
}