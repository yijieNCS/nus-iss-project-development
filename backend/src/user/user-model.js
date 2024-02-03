import {pool} from "../config/database.js";

export async function getUsers() {
    const [rows] = await pool.query(
        `SELECT * FROM tbl_user`
    );
    return rows;
}

export async function getUser(id) {
    const [rows] = await pool.query(
        `SELECT * 
        FROM tbl_user
        WHERE userId = ?`, [id]
    );
    return rows[0];
}

export async function deleteUser(id) {
    // First, select the data to be deleted
    const [deletedUserData] = await pool.query(
        `SELECT * FROM tbl_user
        WHERE userId = ?`, [id]
    );

    // Now, delete the row
    const [deletedRows] = await pool.query(
        `DELETE FROM tbl_user
        WHERE userId = ?`, [id]
    );

    if (deletedRows.affectedRows === 0) {
        // If no rows were deleted, return null or throw an error
        return null;
    }
    // Return the deleted data
    return deletedUserData[0];
}


export async function createFunction(userId, age, dateJoined, firstName,lastName,email,education,username,password,birthDate,gender) {
    await pool.query(
        `INSERT INTO tbl_user (userId, age, dateJoined, firstName,lastName,email,education,username,password,birthDate,gender)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [userId, age, dateJoined, firstName,lastName,email,education,username,password,birthDate,gender]
    )
}