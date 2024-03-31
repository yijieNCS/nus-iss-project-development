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

export async function getUserModelByUsername(username) {
    const sql = `SELECT * FROM users WHERE username=?`
    try {
        const [rows] = await pool.query(sql, [username])
        return rows[0]
    } catch (error) {
        throw new Error("Username does not exist")
    }
}

export async function createUserModel(age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender,admin) {
    const sql = `INSERT INTO users (age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender,admin)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`
    try {
        console.log("Age: "+age+",dateJoined: "+dateJoined+", firstName: "+firstName+", lastName: "+lastName+" ,email: "+email+" ,edu: "+education+" ,username: "+username+" ,password: "+password+" ,birthdate: "+birthDate+" ,gender: "+gender+ " ,admin: "+admin)

        const [result] = await pool.query(sql, [age, dateJoined, firstName, lastName, email, education, username, password, birthDate, gender,admin])
        return result.insertId
    } catch (error) {
        throw new Error("Failed to create the user")
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