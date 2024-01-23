const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
    host: '172.17.0.2',
    port: 3307,
    user: 'root',
    password: 'password',
    database: 'sg_learner_db'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MYSQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
})