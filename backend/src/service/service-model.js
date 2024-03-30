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

export async function getServicebyUserId(userid) {  //get all service(subjects) cards by userid for resume page
    const sql = `SELECT * FROM service WHERE userId = ?` 
    try {
        const [rows] = await pool.query(sql, [user])
        return rows[0];
    } catch (error) {
        throw new Error("Failed to fetch particular session from the database")
    }
}

export async function createServiceModel(userId, subject, topic, experience, rate) {
    const sql = `INSERT INTO service (userId, subject, topic, experience, rate) VALUES(?, ?, ?, ?, ?)`
    try {
        const [result] = await pool.query(sql, [userId, subject, topic, experience, rate])
        return result.insertId
    } catch (error) {
        throw new Error("Failed to create the service")
    }    
}

export async function updateServiceModel(serviceId, userId, subject, topic, experience, rate){
    const sql = `UPDATE service SET userId=?, subject=?, topic=?, experience=?, rate=? WHERE serviceId=?` 
    try {
        const [result] = await pool.query(sql, [userId, subject, topic, experience, rate, serviceId])
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