import {pool} from "../app.js"; //changed to app.js
 
export async function getServices() {
    const sql = `SELECT * FROM service`
    try {
        const [rows] = await pool.query(sql)
        return rows
    } catch (error) {
        console.error(pool.user)
        throw new Error(error)
    }
}
 
export async function getService(id) {
    const sql = `SELECT * FROM service WHERE serviceId = ?` 
    try {
        const [rows] = await pool.query(sql, [id])
        return rows[0];
    } catch (error) {
        throw new Error("Failed to fetch particular session from the database")
    }
}


export async function createServiceModel(userId, rate) {
    const sql = `INSERT INTO service (userId, rate) VALUES(?, ?)`
    try {
        const [result] = await pool.query(sql, [userId, rate])
        return result.insertId
    } catch (error) {
        throw new Error("Failed to create the session")
    }    
}

export async function updateServiceModel(serviceId, userId, rate){
    const sql = `UPDATE service SET userId=?, rate=? WHERE serviceId=?`
    try {
        const [result] = await pool.query(sql, [userId, rate,serviceId])
        return serviceId
    } catch(error) {
        throw new Error(error)
    }
}

export async function deleteServiceModel(serviceId) {
    const sql = `DELETE FROM service WHERE serviceId=?`
    try {
        await pool.query(sql, [serviceId])
        return serviceId
    } catch (error) {
        throw new Error("Failed to delete the session")
    }
}


// add CRUD