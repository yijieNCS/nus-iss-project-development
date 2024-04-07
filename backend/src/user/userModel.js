import { pool } from "../app.js";

export async function getUsersModel() {
    const sql = `SELECT * FROM users`
    try {
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        throw new Error("Failed to fetch users from the database")
    }
}

export async function getUserModel(userId) {
    const sql = `SELECT * FROM users WHERE userId=?`
    try {
        const [rows] = await pool.query(sql, [userId])
        return rows[0];
    } catch (error) {
        throw new Error("Failed to fetch particular user from the database")
    }
}

export async function getnonAdminUserModelExcept(userId) {
    const sql = `SELECT * FROM users WHERE userId!=? AND ADMIN='N'`
    try {
        const [rows] = await pool.query(sql, [userId])
        return rows;
    } catch (error) {
        throw new Error("Failed to fetch particular user from the database")
    }
}


export async function getUserModelByUsername(username) {
    const sql = `SELECT * FROM users WHERE username=?`
    try {
        const [rows] = await pool.query(sql, [username])
        return rows[0]
    } catch (error) {
        throw new Error("Username does not exist")
    }
}

// async function createUserModel({
//                                    age = null,
//                                    dateJoined = null,
//                                    firstName = null,
//                                    lastName = null,
//                                    email = null,
//                                    education = null,
//                                    username = null,
//                                    password = null,
//                                    birthDate = null,
//                                    gender = null,
//                                    admin = false // Assuming admin defaults to false if not provided
//                                }) {
//     // Your code here
// }

// INSERT INTO users (userId, age, firstName, lastName, email, education, username, password, birthDate, gender, admin)
// VALUES (NULL,28,'John','Doe','JohnDoe@gmail.com','Bachelor degree of Electronic and Electrical Engineering','JohnDoe','passJD','1995-05-15 00:00:00','M','N');

export async function createUserModel({
  age = 0,
  firstName = null,
  lastName = null,
  email = null,
  education = null,
  username = null,
  password = null,
  birthDate = null,
  gender = null,
  admin = null
}) {
    const sql = `INSERT INTO users (age, firstName, lastName, email, education, username, password, birthDate, gender, admin)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    try {
        const [result] = await pool.query(sql, [age, firstName, lastName, email, education, username, password, birthDate, gender, admin])
        return result.insertId
    } catch (error) {
        throw new Error(`The error is ${error}`)
    }
}

export async function deleteUserModel(userId) {
    const checkUserSql = `SELECT * FROM users WHERE userId=?`;
    const deleteSql = `DELETE FROM users WHERE userId=?`;
    try { 
        const [userRows] = await pool.query(checkUserSql, [userId]);
        if (userRows.length === 0) {
            throw new Error("User not found");
        }
        
        const result = await pool.query(deleteSql, [userId]);
        if (result.affectedRows === 0) {
            throw new Error("Failed to delete the user");
        }
        
        return userId;
    } catch (error) {
        throw error;
    }
}

export async function deleteUserModelbyUsername(username) {
    const checkUserSql = `SELECT * FROM users WHERE username=?`;
    const deleteSql = `DELETE FROM users WHERE username=?`;
    try { 
        const [userRows] = await pool.query(checkUserSql, [username]);
        if (userRows.length === 0) {
            throw new Error("User not found");
        }
        
        const result = await pool.query(deleteSql, [username]);
        if (result.affectedRows === 0) {
            throw new Error("Failed to delete the user");
        }
        
        return username;
    } catch (error) {
        throw error;
    }
}




export async function updateUserModel(userId, age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender,admin){
    const checkUserSql = `SELECT * FROM users WHERE userId=?`;
    const sql = `UPDATE users
                        SET age=?, dateJoined=?, firstName=?, lastName=?, email=?, education=?, username=?, password=?, birthDate=?, gender=?, admin=?
                        WHERE userId=?`
    try {
        const [userRows] = await pool.query(checkUserSql, [userId]);
        if (userRows.length === 0) {
            throw new Error("User not found");
        }
        const [result] = await pool.query(sql, [age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender, admin, userId])
        if (result.affectedRows === 0) {
            throw new Error("Failed to update the user");
        }
        return userId
    } catch(error) {
       throw error
    }
}

export async function updateUserModelPasswordByUserName(username, newPassword){
    const sql = `UPDATE users SET password=? WHERE username=?`
    try {
        const [result] = await pool.query(sql, [ newPassword, username])
        if (result.affectedRows === 0) {
            throw new Error("Failed to update user password");
        }
        return newPassword
    } catch(error) {
       throw error
    }
}