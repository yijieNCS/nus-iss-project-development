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
        WHERE userId = ?`, [3]
    );
    return rows[0];
}

export async function createFunction(userId, age, dateJoined, firstName,lastName,email,education,username,password,birthDate,gender) {
    await pool.query(
        `INSERT INTO tbl_user (userId, age, dateJoined, firstName,lastName,email,education,username,password,birthDate,gender)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [userId, age, dateJoined, firstName,lastName,email,education,username,password,birthDate,gender]
    )
}